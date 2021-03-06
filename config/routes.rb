Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:show, :new, :create]
    resource :session, only: [:new, :create, :destroy]
    resources :routes, only: [:index, :show, :create, :destroy]
    resources :comments, only: [:index, :update, :show, :create, :destroy]
  end

end
