//licenseTextFrameFitToFrame("//div[@class='jrnlLicenseStmtGrp']", 50);
alignFrame('REDATE,AC_RULE,ACDATE','REVDATE','REV_RULE');
alignFrameShrink('REDATE,AC_RULE,REVDATE,REV_RULE,ACDATE');
inlineEqBaseAlign("//p[@pstyle='txtCiteInfo']");
Abstract(-19, 0, "jrnlAbsHead,jrnlAbsParaFirst,jrnlAbsFontReduce_First,jrnlAbsParaLast", "//div[@class='jrnlAbsGroup']", "Abstract head", "Abstract box", 782.09, 18);
findAndReplaceSpecialCharacter("Minion Pro","Regular","~r","Minion","Regular");
reduceFirstFrameHt('bjr.20170313', -3);// Reduce First Frame Height
reduceFirstFrameHt('bjr.20170278,bjr.20170361', 1);// Increase First Frame Height
moveAcdateForFirstFrameBounds('bjr.20160811.e');
tableLastRowColorChange_BJRCR("//Table[@class='jrnlTblBlock']", "COLOR4");