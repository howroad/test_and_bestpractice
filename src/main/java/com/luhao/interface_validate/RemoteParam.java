package com.luhao.interface_validate;

import com.nstc.util.CastUtil;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.xml.sax.Attributes;

/**
 * <p>Title: RemoteParam.java</p>
 * <p>Description: 接口参数</p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-14 11:13
 */
public class RemoteParam {
    private String name;
    private String remark;
    private Integer length;
    //小数位数
    private Integer decimalDigits;
    //类型 NUMBER/NUMBER(X,X)/INTEGER/VARCHAR2(XX)/DATE
    private String type;
    //必填
    private Integer require;
    private String reg;
    private String fieldName;

    private final static String NAME_TAG = "name";
    private final static String REMARK_TAG = "remark";
    private final static String TYPE_TAG = "type";
    private final static String REQUIRE_TAG = "require";
    private final static String REG_TAG = "reg";
    private final static String FIELD_NAME = "fieldName";
    private final static Integer YES = 1;
    private final static String INTEGER_REG = "^-?\\d+$";
    private final static String DATE_REG = "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|" +
            "((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|" +
            "((0[48]|[2468][048]|[3579][26])00))-02-29)$";

    private String getDoubleReg() {
        return "^[-\\+]?\\d{1," + length + "}(\\.\\d{0," + decimalDigits + "})?|\\.\\d{1," + decimalDigits + "}$";
    }

    public RemoteParam(Attributes attributes) {
        name = attributes.getValue(NAME_TAG);
        remark = attributes.getValue(REMARK_TAG);
        type = attributes.getValue(TYPE_TAG);
        require = CastUtil.toInteger(attributes.getValue(REQUIRE_TAG));
        reg = CastUtil.toNotEmptyString(attributes.getValue(REG_TAG));
        fieldName = CastUtil.toNotEmptyString(attributes.getValue(FIELD_NAME));
        setLength(type);
    }

    public void setLength(String type) {
        if ("D".equals(type)) {
            length = 10;
            decimalDigits = null;
        } else if (type.startsWith("C")) {
            length = CastUtil.toInteger(type.replace("C", ""));
            decimalDigits = null;
        } else if (type.startsWith("N") && type.contains(",")) {
            String[] strArr = type.replace("N", "").split(",");
            length = CastUtil.toInteger(strArr[0]);
            decimalDigits = CastUtil.toInteger(strArr[1]);
        } else if (type.startsWith("N") && !type.contains(",")) {
            length = CastUtil.toInteger(type.replace("N", ""));
            decimalDigits = null;
        }
    }

    public void validate(Object obj, String sign) {
        if (obj == null) {
            Validate.isTrue(!YES.equals(require), notice(sign) + "不能为空！");
        }
        String value = (String) obj;
        if (StringUtils.isBlank(value)) {
            Validate.isTrue(!YES.equals(require), notice(sign)  + "不能为空！");
        } else {
            if (type.startsWith("C")) {
                Validate.isTrue(value.length() <= length, notice(sign)  + "长度不可大于" + length + ":" + obj);
            } else if ("N".equals(type) && decimalDigits == null) {
                Validate.isTrue(value.matches(INTEGER_REG), notice(sign)  + "不满足整数规则！" + ":" + obj);
                Validate.isTrue(value.length() <= length, notice(sign)  + "长度不可大于" + length + ":" + obj);

            } else if (decimalDigits != null) {
                Validate.isTrue(value.matches(getDoubleReg()), notice(sign)  + "必须为浮点数类型，且整数位不可超过" + length + "，小数位不可超过" + decimalDigits + ":" + obj);
            } else if ("D".equals(type)) {
                Validate.isTrue(value.matches(DATE_REG), notice(sign) + "不符合日期格式!" + ":" + obj);
            }
            if (StringUtils.isNotBlank(reg)) {
                Validate.isTrue(value.matches(reg), notice(sign)  + "参数值不合法！" + ":" + obj);
            }
        }

    }

    /**
     * 提示信息
     * @param sign 标记错误的未知
     * @return
     */
    private String notice(String sign){
        return sign + remark + "(" + name + ")";
    }

    @Override
    public String toString() {
        return "RemoteParam{" +
                "name='" + name + '\'' +
                ", remark='" + remark + '\'' +
                ", length=" + length +
                ", decimalDigits=" + decimalDigits +
                ", type='" + type + '\'' +
                ", require=" + require +
                ", reg='" + reg + '\'' +
                ", fieldName='" + fieldName + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getRequire() {
        return require;
    }

    public void setRequire(Integer require) {
        this.require = require;
    }

    public String getReg() {
        return reg;
    }

    public void setReg(String reg) {
        this.reg = reg;
    }

    public Integer getDecimalDigits() {
        return decimalDigits;
    }

    public void setDecimalDigits(Integer decimalDigits) {
        this.decimalDigits = decimalDigits;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }
}
