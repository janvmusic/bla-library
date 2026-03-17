### Summary

BLA Ruby + React assessment

### Setup

1. [Install ruby and rails](https://guides.rubyonrails.org/v8.0/install_ruby_on_rails.html)

```bash
# Install Xcode Command Line Tools
$ xcode-select --install

# Install Homebrew and dependencies
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
$ brew install openssl@3 libyaml gmp rust

# Install Mise version manager
$ curl https://mise.run | sh
$ echo 'eval "$(~/.local/bin/mise activate)"' >> ~/.zshrc
$ source ~/.zshrc

# Install Ruby globally with Mise
$ mise use -g ruby@3
```

2. To setup the BE use

```bash
cd backend && bundle install
```

3. Install Github CLI

```bash
brew install gh
gh auth login
```

4. Install postgres

```bash
# Install
brew install postgresql@16
brew services start postgresql@16

# Reload your zsh
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
source ~/.zshrc

# Verify
psql --version
psql postgres
```

5. Set up your DB

```bash
bundle exec rails db:create
bundle exec rails db:migrate
bundle exec rails db:seed
```

### Demo Credentials

| Role      | Email                 | Password    |
| --------- | --------------------- | ----------- |
| Librarian | librarian@example.com | password123 |
| Member    | member@example.com    | password123 |
