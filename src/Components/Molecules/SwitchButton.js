import { useTheme } from "styled-components";
import Switch from "react-switch";
import Text from "../../Components/Atoms/Text";

const SwitchButton = ({ checked, onChange, label }, props) => {
  const theme = useTheme();
  return (
    <>
    <label >
      <Switch
        onColor={theme.colors.primary}
        offColor={theme.colors.middlegrey}
        uncheckedIcon={false}
        checkedIcon={false}
        onChange={onChange}
        checked={checked}
        width={props.width || 40}
        height={props.height || 20}
        handleDiameter={props.handleSize || 18}
      />
      <Text
        size="14px"
        display="inline"
        marginLeft="10px"
        lineHeight="1.5"
      >
        {label}
      </Text>
    </label>
    </>
  );
};

export default SwitchButton;
