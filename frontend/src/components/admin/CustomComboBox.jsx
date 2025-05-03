import { useEffect } from "react";


const CustomComboBox = (props) => {

    useEffect(() => {
    }, [dataSource])

    var { dataSource, textField, valueField, selectedValue, onChange, disabled=false, required=true } = props;
    if (!onChange){
        onChange = () => {};
    }

    return (
        <div className="custom-combo-box">
            <select
                className="form-select"
                onChange={(e) => onChange(e.target.value)}
                value={selectedValue}
                disabled={disabled}
                required={required}
            >
                {dataSource.length > 0 && dataSource.map((item) => (
                    <option key={item[valueField]} value={item[valueField]}>
                        {item[textField]}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CustomComboBox;