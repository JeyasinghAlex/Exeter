alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsHead|jrnlAbsTitle|TXT_CHAP_FIRST|TXT_CHAP_FIRST_Right|TXT_CHAP_FIRST_Left|PMS_jrnlAbsHead|jrnlAbsTitle|jrnlAbsPara|jrnlHead1_First|QUOTE-O|jrnlAuthors', 'ascent');
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
stackStubFrames();
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']|//p[@pstyle='ILLUMINATIONS_jrnlAuthors']|//p[@pstyle='jrnlArtTitle']");
moveBlockToColumnBottom(162.092, "//div[@class='jrnlFNTxtBlock']", 'TXT_FN');
placePhotos("//div[@class='body']", "//pFig[@class='ED_IMG']");
alignParaTopLineImage("//div[@class='body']", "//pFig[@class='ALIGN_PARA_TOP']");
removeOpenAccLogo("//p[@pstyle='jrnlLicense']");
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
dublin_core_metadata();
placingLib_behind_artTitle("//div[@class='front']//p[@pstyle='jrnlCategory']|//div[@class='front']//p[@pstyle='jrnlArtTitle']|//div[@class='front']//p[@pstyle='jrnlArtSubTitle']","BJR_MoGram",myDoc,15.5,15.5); // article tile | articleSub title
addSpaceBeforeFirstParaInFn("//div[@class='jrnlRefGroup']/p[last()]/following::*");
