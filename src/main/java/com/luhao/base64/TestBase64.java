package com.luhao.base64;

import java.io.UnsupportedEncodingException;

import com.nstc.util.Base64;

/**
 * <p>Title: TestBase64.java</p>
 *
 * <p>Description: </p>
 *
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * 
 * @since：2019年4月12日 下午1:12:40
 * 
 */
public class TestBase64 {
    public static void main(String[] args) {
//        String str = "onclick = 'casas\"\"'你好====啊哈哈哈哈 haloi号oijopofpokagp";
        //testStr();
        test1();
    }
    public static void testStr() {
        for (int i = 65536; i > 0; i--) {
            char chr = (char) i;
            String str = "";
            String str1 = Base64.getEncodeString(str);
            String str2 = Base64.getDecodeString(str1);
            if(!str.equals(str2)) {
                System.out.println("no!");
                System.out.println(str);
                System.out.println(i);
                return;
            }
        }
        
    }
    
    public static void test1() {
    String str = "PGRpdiB0aXRsZT0itby6vcf4IiBzdHlsZT0id2lkdGg6IDEwMCU7IG92ZXJmbG93OiB2aXNpYmxlOyBtYXJnaW4tYm90dG9tOiAxMHB4OyI+PHRhYmxlIGlkPSJ0YWJsZV9sYXlvdXRfbmF2Ij48Y29sZ3JvdXA+PGNvbCB3aWR0aD0iMTAwJSIgY2xhc3M9IkwiPjwvY29sZ3JvdXA+PHRib2R5Pjx0cj48dGQgY2xhc3M9ImRyb3B0ZCIgaWQ9InBhZ2VUb3BOYXYiPjwvdGQ+PC90cj48L3Rib2R5PjwvdGFibGU+PC9kaXY+PGRpdiB0aXRsZT0i0rPD5rHtuPHH+CIgaWQ9IndvcmtsYXlvdXQiIHN0eWxlPSJ3aWR0aDogMTAwJTsgb3ZlcmZsb3c6IHZpc2libGU7IG1hcmdpbi1ib3R0b206IDVweDsiIHByb3A9J3sidW5pdHR5cGUiOiIwIiwiYm9keUNzcyI6IkJPRFlfU0NSX0FVVE8iLCJydW50YWIiOiI8dGFibGUgYm9yZGVyPTAgIGNsYXNzPVwiVzEwMCBmaXhlZHRhYmxlXCIgY2VsbHNwYWNpbmc9XCIwXCIgY2VsbHBhZGRpbmc9XCIwXCI+PGNvbGdyb3VwPjxjb2wgd2lkdGg9XCIxMDAlXCIgY2xhc3M9XCJMXCI+PC9jb2xncm91cD48dGJvZHk+PHRyPjx0ZD4ke2dkdF9jdXN0QnVzc190aX08L3RkPjwvdHI+PHRyPjx0ZD4ke2dkdF9jdXN0QnVzc19maXhlZH08L3RkPjwvdHI+PHRyPjx0ZD4ke2dkdF9jdXN0QnVzc19lbGVtZW50fTwvdGQ+PC90cj48dHI+PHRkPiR7Z2R0X2N1c3RCdXNzX2V4dHJhfTwvdGQ+PC90cj48dHI+PHRkPiR7Z2R0X2N1c3RCdXNzX2J1dHRvbn08L3RkPjwvdHI+PC90Ym9keT48L3RhYmxlPiIsInRvcGpzIjoianMvZ2R0X2N1c3RCdXNzLmpzIiwiYWN0aW9uY2xhc3MiOiJMOmNvbS5uc3RjLmdkdC5jb250cm9sbGVyLmJ1c2luZXNzLmN1c3QuU2hvd0N1c3RCdXNzQnVzaW5lc3MiLCJhcHBubyI6Mjk1LCJhcHBjb2RlIjoiR0RFQklUIiwicHJvcDEwIjoie1wicGFnZUJ1dHRvblwiOltdfSIsInBhZ2VpZCI6ImdkdF9jdXN0QnVzcyIsInRpdGxlIjoi19S2qNLlxrfW1iIsInBwaWQiOiIxNTUyOTY1ODc4MjY5IiwiZG9tYWlubm8iOjUyOSwidGFibGVjc3MiOiJXMTAwIiwidGVtcGxhdGUiOiIiLCJjdXN0U3FsSUQiOiIiLCJzbV9nbGJfYnRuX2NrIjoiMSIsInNtX2dsYl9idG4iOiIifSc+PHRhYmxlIGlkPSJ0YWJsZV9sYXlvdXQiPjxjb2xncm91cD48Y29sIHdpZHRoPSIxMDAlIiBjbGFzcz0iTCI+PC9jb2xncm91cD48dGJvZHk+PHRyPjx0ZCBjbGFzcz0iZHJvcHRkIj48c3BhbiB0YWJpbmRleD0iMTAiIHRpdGxlPSK1pdSqIiBjbGFzcz0iZTEwMCBkcmFnIiBpZD0iZ2R0X2N1c3RCdXNzX3RpIiBzdHlsZT0ibGVmdDogMHB4OyB0b3A6IDBweDsgdmlzaWJpbGl0eTogdmlzaWJsZTsgb3BhY2l0eTogMTsiIGF1dG9sYWJlbD0iZmFsc2UiIGVsPSd7InR5cCI6IjEiLCJpZCI6MTU1Mjk3NTMxNTk0NSwiZW5tIjoidW5pdCIsIm5hbSI6InVuaXQiLCJsYWJlbEZsYWciOjB9JyB0eXA9IjEiIHZhZT0iIiBsYWJlbGZsYWc9IjAiPmdkdF9jdXN0QnVzc190aTwvc3Bhbj48L3RkPjwvdHI+PHRyPjx0ZCBjbGFzcz0iZHJvcHRkIj48";
    //String str1 = new ChangeCharset().toUTF_8(str);//通过runConfig 修改控制台编码
    String str2 = Base64.getDecodeString(str);
    System.out.println(str2);
    
            
    }
}
