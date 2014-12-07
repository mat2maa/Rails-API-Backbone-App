class CssController < ApplicationController

  def index
    respond_to do |format|
      format.css { render layout: false }
    end
  end

end