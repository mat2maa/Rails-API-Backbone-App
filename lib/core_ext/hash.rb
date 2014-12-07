class Hash
  def delete_blank
    delete_if{ |k, v| v.nil? or v.instance_of?(Hash) && v.delete_blank.nil? }
  end
end
