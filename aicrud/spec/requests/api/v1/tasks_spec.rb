require "rails_helper"

RSpec.describe "Api::V1::Tasks", type: :request do
  let(:user)       { create(:user) }
  let(:other_user) { create(:user) }

  # Stub current_user for all examples; override per-context as needed.
  before do
    allow_any_instance_of(ApplicationController)
      .to receive(:current_user).and_return(user)
  end

  # ── INDEX ────────────────────────────────────────────────────────────────────

  describe "GET /api/v1/users/:user_id/tasks" do
    it "returns 200 with only the current user's tasks" do
      own_task   = create(:task, user: user)
      _other_task = create(:task, user: other_user)

      get "/api/v1/users/#{user.id}/tasks"

      expect(response).to have_http_status(:ok)
      ids = JSON.parse(response.body).pluck("id")
      expect(ids).to     include(own_task.id)
      expect(ids).not_to include(_other_task.id)
    end
  end

  # ── CREATE ───────────────────────────────────────────────────────────────────

  describe "POST /api/v1/users/:user_id/tasks" do
    context "with valid params" do
      it "creates a task and responds 201" do
        post "/api/v1/users/#{user.id}/tasks",
             params: { task: { title: "Buy milk", due_date: 1.day.from_now } }

        expect(response).to have_http_status(:created)
        body = JSON.parse(response.body)
        expect(body["title"]).to eq("Buy milk")
        expect(body["status"]).to eq("todo")
      end
    end

    context "with missing title" do
      it "responds 422 with error details" do
        post "/api/v1/users/#{user.id}/tasks",
             params: { task: { description: "no title here" } }

        expect(response).to have_http_status(:unprocessable_entity)
        errors = JSON.parse(response.body)["errors"]
        expect(errors).to be_an(Array)
        expect(errors).not_to be_empty
      end
    end

    context "when targeting another user's resource" do
      it "responds 403" do
        post "/api/v1/users/#{other_user.id}/tasks",
             params: { task: { title: "Hijack" } }

        expect(response).to have_http_status(:forbidden)
      end
    end
  end

  # ── UPDATE ───────────────────────────────────────────────────────────────────

  describe "PATCH /api/v1/users/:user_id/tasks/:id" do
    let!(:task) { create(:task, user: user, title: "Original") }

    context "with valid partial params" do
      it "updates only the supplied fields and responds 200" do
        patch "/api/v1/users/#{user.id}/tasks/#{task.id}",
              params: { task: { title: "Updated" } }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["title"]).to eq("Updated")
        expect(task.reload.title).to eq("Updated")
      end
    end

    context "when the task does not exist" do
      it "responds 404" do
        patch "/api/v1/users/#{user.id}/tasks/0",
              params: { task: { title: "Ghost" } }

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  # ── DESTROY ──────────────────────────────────────────────────────────────────

  describe "DELETE /api/v1/users/:user_id/tasks/:id" do
    let!(:task) { create(:task, user: user, status: :todo) }

    it "responds 200 with the updated task" do
      delete "/api/v1/users/#{user.id}/tasks/#{task.id}"

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["status"]).to eq("done")
    end

    it "sets status to :done" do
      delete "/api/v1/users/#{user.id}/tasks/#{task.id}"

      expect(task.reload.status).to eq("done")
    end

    it "does not destroy the record" do
      expect {
        delete "/api/v1/users/#{user.id}/tasks/#{task.id}"
      }.not_to change(Task, :count)
    end
  end
end
