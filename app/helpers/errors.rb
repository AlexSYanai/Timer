def set_error(error_message)
  session[:error] = error_message
end

def display_error
  error = session[:error]
  session[:error] = nil
  error
end

def set_ar_errors(ar_obj)
  error_msg = ""
  ar_obj.errors.messages.each do |attr, messages|
    error_msg += "#{attr}: #{messages.join(", ")}"
  end
  set_error("Error: " + error_msg) 
end