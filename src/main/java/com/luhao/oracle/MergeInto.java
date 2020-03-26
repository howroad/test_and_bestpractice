package com.luhao.oracle;

/**
 * <p>Title: MergeInto.java</p>
 * <p>Description: </p>
 * <p>Company: 北京九恒星科技股份有限公司</p>
 *
 * @author luhao
 * @since 2020-03-26 10:20
 */
public class MergeInto {
    //也可以删除

    //MERGE INTO AIMS_ACCOUNT_ATTR T
    //USING (SELECT AA.ACCOUNTID                   ACCOUNTID,
    //              GCD42.V_45                     ACCOUNTNO,
    //              1                              IS_LAW_PERMEATION
    //       FROM GDT_CUST_GDTCLMS42 GCD42
    //                JOIN AIMS_ACCOUNT AA ON AA.ACCOUNTNO = GCD42.V_45) GDT
    //ON (GDT.ACCOUNTID = T.ACCOUNTID)
    //WHEN MATCHED THEN
    //    UPDATE SET T.IS_LAW_PERMEATION = GDT.IS_LAW_PERMEATION
    //    DELETE WHERE GDT.ACCOUNTID = T.ACCOUNTID
    //WHEN NOT MATCHED THEN
    //    INSERT
    //        (ID, ACCOUNTID, ACCOUNTNO, IS_LAW_PERMEATION)
    //    VALUES (AIMS_ACCOUNT_ATTR_SEQ.NEXTVAL, GDT.ACCOUNTID, GDT.ACCOUNTNO, 1)



    //        MERGE INTO AIMS_ACCOUNT_ATTR T
    //        USING (
    //            SELECT AAA.ACCOUNTID ACCOUNTID,AAA.ACCOUNTNO ACCOUNTNO,0 IS_LAW_PERMEATION FROM AIMS_AC
    //            UNION
    //            SELECT AA.ACCOUNTID ACCOUNTID, AA.ACCOUNTNO ACCOUNTNO, 1 IS_LAW_PERMEATION FROM GDT_CUS
    //        ) GDT
    //        ON (GDT.ACCOUNTID = T.ACCOUNTID)
    //        WHEN MATCHED THEN
    //          UPDATE
    //             SET T.IS_LAW_PERMEATION = GDT.IS_LAW_PERMEATION
    //        WHEN NOT MATCHED THEN
    //          INSERT
    //            (ID, ACCOUNTID, ACCOUNTNO, IS_LAW_PERMEATION)
    //          VALUES
    //            (AIMS_ACCOUNT_ATTR_SEQ.NEXTVAL, GDT.ACCOUNTID, GDT.ACCOUNTNO, GDT.IS_LAW_PERMEATION)
    public static void main(String[] args){
        String delete = "MERGE INTO AIMS_ACCOUNT_ATTR T\n" +
                "USING (SELECT AA.ACCOUNTID                   ACCOUNTID,\n" +
                "              GCD42.V_45                     ACCOUNTNO,\n" +
                "              1                              IS_LAW_PERMEATION\n" +
                "       FROM GDT_CUST_GDTCLMS42 GCD42\n" +
                "                JOIN AIMS_ACCOUNT AA ON AA.ACCOUNTNO = GCD42.V_45) GDT\n" +
                "ON (GDT.ACCOUNTID = T.ACCOUNTID)\n" +
                "WHEN MATCHED THEN\n" +
                "    UPDATE SET T.IS_LAW_PERMEATION = GDT.IS_LAW_PERMEATION \n" +
                "    DELETE WHERE GDT.ACCOUNTID = T.ACCOUNTID\n" +
                "WHEN NOT MATCHED THEN\n" +
                "    INSERT\n" +
                "        (ID, ACCOUNTID, ACCOUNTNO, IS_LAW_PERMEATION)\n" +
                "    VALUES (AIMS_ACCOUNT_ATTR_SEQ.NEXTVAL, GDT.ACCOUNTID, GDT.ACCOUNTNO, 1)\n";
        String sql = "        MERGE INTO AIMS_ACCOUNT_ATTR T\n" +
                "        USING (\n" +
                "            SELECT AAA.ACCOUNTID ACCOUNTID,AAA.ACCOUNTNO ACCOUNTNO,0 IS_LAW_PERMEATION FROM AIMS_ACCOUNT_ATTR AAA WHERE NOT EXISTS (SELECT 1 FROM GDT_CUST_GDTCLMS42 GDT42 WHERE GDT42.V_45 = AAA.ACCOUNTNO)\n" +
                "            UNION \n" +
                "            SELECT AA.ACCOUNTID ACCOUNTID, AA.ACCOUNTNO ACCOUNTNO, 1 IS_LAW_PERMEATION FROM GDT_CUST_GDTCLMS42 GDT42 JOIN AIMS_ACCOUNT AA ON AA.ACCOUNTNO = GDT42.V_45\n" +
                "        ) GDT\n" +
                "        ON (GDT.ACCOUNTID = T.ACCOUNTID)\n" +
                "        WHEN MATCHED THEN\n" +
                "          UPDATE\n" +
                "             SET T.IS_LAW_PERMEATION = GDT.IS_LAW_PERMEATION \n" +
                "        WHEN NOT MATCHED THEN\n" +
                "          INSERT\n" +
                "            (ID, ACCOUNTID, ACCOUNTNO, IS_LAW_PERMEATION)\n" +
                "          VALUES\n" +
                "            (AIMS_ACCOUNT_ATTR_SEQ.NEXTVAL, GDT.ACCOUNTID, GDT.ACCOUNTNO, GDT.IS_LAW_PERMEATION)";
        System.out.println(sql);
    }
}
