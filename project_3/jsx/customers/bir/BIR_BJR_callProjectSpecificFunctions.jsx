﻿changedparagraphStylePropertyTospancolumn('jrnlRefHead');
licenseTextFrameFitToFrame("//div[@class='jrnlLicenseStmtGrp']", 50);
alignFrame('REDATE,AC_RULE,ACDATE','REVDATE','REV_RULE');
alignFrameShrink('REDATE,AC_RULE,REVDATE,REV_RULE,ACDATE');
inlineEqBaseAlign("//p[@pstyle='txtCiteInfo']");
Abstract(-19, 0, "jrnlAbsHead,jrnlAbsParaFirst,jrnlAbsFontReduce_First,jrnlAbsParaLast", "//div[@class='jrnlAbsGroup']", "Abstract head", "Abstract box", 782.09, 18);
findAndReplaceSpecialCharacter("Minion Pro","Regular","~r","Minion","Regular");
findAndReplaceSpecialCharacter("Gotham","Book","Ω","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Gotham","Bold","≤","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Gotham","Light","≤","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Minion Pro","Regular","≤","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Gotham","Book","≤","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Gotham","Bold","≥","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Minion Pro","Regular","≥","Symbol","Medium"); 
findAndReplaceSpecialCharacter("Gotham","Book","≥","Symbol","Medium"); 
reduceFirstFrameHt('bjr.20170313,bjr.20170524', -3);// Reduce First Frame Height
reduceFirstFrameHt('bjr.20170278,bjr.20170361,bjr.20170676,bjr.20170156', 1);// Increase First Frame Height
moveAcdateForFirstFrameBounds('bjr.20160811.e');