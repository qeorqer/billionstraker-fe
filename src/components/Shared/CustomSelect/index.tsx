import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import 'components/Shared/CustomSelect/styles.scss';

type dataType = {
  _id: string;
  name: string;
  disabled?: boolean;
};

type propsType = {
  defaultButtonText: string;
  defaultButtonValue: string;
  data: dataType[];
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  fieldToSelect?: '_id' | 'name';
  withTranslate?: boolean;
  disabled?: boolean;
  showDefaultValue?: boolean;
};

const CustomSelect: React.FC<propsType> = ({
  defaultButtonText,
  defaultButtonValue,
  data,
  selectedValue,
  setSelectedValue,
  withTranslate,
  disabled = false,
  fieldToSelect = '_id',
  showDefaultValue = true,
}) => {
  const [valueToShow, setValueToShow] = useState(defaultButtonText);

  const { t } = useTranslation();

  useEffect(() => {
    console.log(selectedValue, data);

    if (selectedValue === defaultButtonValue) {
      // setSelectedValue(defaultButtonValue);
      setValueToShow(defaultButtonText);
      return;
    }

    const selectedItem = data.find(
      (item) =>
        item[fieldToSelect] === selectedValue || item['name'] === selectedValue,
    );

    if (selectedItem) {
      setValueToShow(selectedItem.name);
    }
  }, [data, selectedValue]);

  return (
    <Dropdown className="w-100 customDropdown">
      <Dropdown.Toggle
        variant="outline-warning"
        className="w-100 d-flex justify-content-between align-items-center"
        disabled={disabled}>
        {withTranslate ? t(valueToShow) : valueToShow}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {showDefaultValue && (
          <>
            <Dropdown.Item
              as="span"
              onClick={() => setSelectedValue(defaultButtonValue)}>
              {defaultButtonText}
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        )}
        {data.map((item) => (
          <Dropdown.Item
            as="span"
            key={item._id}
            onClick={() => setSelectedValue(item[fieldToSelect])}
            disabled={Boolean(item.disabled)}>
            {withTranslate ? t(item.name) : item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomSelect;
