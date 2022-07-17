import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

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
};

const CustomSelect: React.FC<propsType> = ({
  defaultButtonText,
  defaultButtonValue,
  data,
  selectedValue,
  setSelectedValue,
}) => {
  const [valueToShow, setValueToShow] = useState(defaultButtonText);

  useEffect(() => {
    const selectedItem = data.find((item) => item._id === selectedValue);

    if (!selectedItem) {
      setSelectedValue(defaultButtonValue);
      setValueToShow(defaultButtonText);
    } else {
      setValueToShow(selectedItem.name);
    }
  }, [data, selectedValue]);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-warning">{valueToShow}</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          as="span"
          onClick={() => setSelectedValue(defaultButtonValue)}
        >
          {defaultButtonText}
        </Dropdown.Item>
        <Dropdown.Divider />
        {data.map((item) => (
          <Dropdown.Item
            as="span"
            key={item._id}
            onClick={() => setSelectedValue(item._id)}
            disabled={Boolean(item.disabled)}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomSelect;
