class EmployeeController < ApplicationController
  before_action :authenticate_request!

  def dashboard
    assets = GenericService.new({:user => current_user}).user_assets
    render json: {:assets => assets}
  end

  def request_asset
    begin
      current_user.user_assets.create!(asset_params[:asset_params])
      render json: {:message => "Assets Requested Successfully", :status => 200}
    rescue
      render json: {:message => "Sorry Something happened", :status => 500}
    end
  end

  private

  def asset_params
    params.require :asset_params
    params.permit asset_params: [:name, :count]
  end
end
