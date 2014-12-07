Rails.application.routes.draw do

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do

      post 'login' => 'sessions#create'
      delete 'logout' => 'sessions#destroy'

      resources :users
    end
  end

  get 'javascripts/index' => 'javascripts#index'
  get 'css/index' => 'css#index'
  get '*path' => redirect('/')

end
