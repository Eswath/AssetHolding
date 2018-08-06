class HrController < ApplicationController
  before_action :authenticate_request!

  def dashboard
    company_assets = GenericService.new({}).get_company_assets
    render json: {"assets" => company_assets}
  end

  def create_company_asset
    begin
      CompanyAsset.create!(company_asset_params[:company_asset_params])
      render json: {"asset" => "Company Assets Successfully created", "status" => 200}
    rescue
      render json: {"message" => "Unable to create company assets", "status" => 500}
    end
  end

  def update_company_asset
    begin
      company_asset_params['company_asset_params'].each do |asset|
        company_asset = CompanyAsset.find_by(:name=>asset["name"])
        company_asset.update_attributes(:count => asset["count"])
      end
      render json: {"message" => "Company Assets Successfully updated", "status" => 200}
    rescue
      render json: {"message" => "Unable to update company assets", "status" => 500}
    end
  end

  private

  def serialize_company_asset(object)
    company_asset_json = {
        "id" => object.id,
        "name" => object.name,
        "count" => object.count
    }
    company_asset_json
  end

  def company_asset_params
    params.require :company_asset_params
    params.permit company_asset_params: [:name, :count]
  end

end
