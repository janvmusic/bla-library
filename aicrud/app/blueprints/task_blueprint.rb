class TaskBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :description, :status, :due_date, :user_id
end
