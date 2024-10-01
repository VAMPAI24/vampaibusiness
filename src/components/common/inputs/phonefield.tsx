import React from 'react';
import PhoneInput, { isValidPhoneNumber,getCountries, formatPhoneNumberIntl } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags'
import 'react-phone-number-input/style.css';
import "./styles.scss"

interface PhoneFieldProps {
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
}

const PhoneField: React.FC<PhoneFieldProps> = (props) => {
  const handleChange = (value: string | undefined) => {
    if (value && isValidPhoneNumber(value)) {
      props.onChange(props.name, value)
    } 
    // else {
    //   // Handle invalid phone number
    //   props.onChange(props.name, undefined);
    // }
  };

  return (
    <div className="w-full flex flex-col">
      <p className="my-0 font-[400] text-[.75em] text-neutral-900 capitalize mb-[5px]">Phone Number</p>
      <PhoneInput
        label=""
        title=""
        className="PhoneInput"
        // inputClass="PhoneInput"
        placeholder="Phone Number"
        international
        withCountryCallingCode
        initialValueFormat="national"
        countryCallingCodeEditable={false}
        defaultCountry="NG"
        value={props.value}
        flags={flags}
        disabled={props.disabled}
        onChange={(phone) => handleChange(phone)}
      />
    </div>
  );
};

export default PhoneField;
