package com.luhao.pinyin;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * <p>Title: ChineseToPinYin.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-07-09 11:01
 */
public class ChineseToPinYin {
    public static void main(String[] args) {
        System.out.println(converterToFirstSpell("路昊"));
        System.out.println(converterToFirstSpellOnlyFirstWord("路昊"));

    }

    public static String converterToFirstSpellOnlyFirstWord(String chines) {
        char b;
        int a = chines.length();
        char[] hs = new char[a];
        for (int k = 0; k < a; k++) {
            b = chines.charAt(k);
            String d = String.valueOf(b);
            String str = converterToFirstSpell(d);
            String s = str.toUpperCase();
            hs[k] = s.charAt(0);
        }
        return String.valueOf(hs);
    }

    public static String converterToFirstSpell(String chines) {
        String pinyinName = "";
        char[] nameChar = chines.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i < nameChar.length; i++) {
            String s = String.valueOf(nameChar[i]);
            if (s.matches("[\\u4e00-\\u9fa5]")) {
                try {
                    String[] mPinyinArray = PinyinHelper.toHanyuPinyinStringArray(nameChar[i], defaultFormat);
                    pinyinName += mPinyinArray[0];
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            } else {
                pinyinName += nameChar[i];
            }
        }
        return pinyinName;
    }
}
