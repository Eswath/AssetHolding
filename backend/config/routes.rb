Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  post 'auth_user' => 'authentication#authenticate_user'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope :api, defaults: {format: :json} do
    scope :hr do
      get 'dashboard' => 'hr#dashboard'
      post 'create_company_asset' => 'hr#create_company_asset'
      patch 'update_company_asset' => 'hr#update_company_asset'
      delete 'delete_company_asset' => 'hr#delete_company_asset'
    end

    scope :employee do
      get 'dashboard' => 'employee#dashboard'
      post 'request_asset' => 'employee#request_asset'
    end
    get 'info' => 'api#info'
    # resources :user_assets
    # resources :users
    # resources :company_assets
  end
  get "/404" => "error#not_found"
  get "/500" => "error#exception"
end
