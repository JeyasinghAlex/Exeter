placingLib_behind_artTitle("//div[@class='front']//p[@pstyle='jrnlCategory']|//div[@class='front']//p[@pstyle='jrnlArtTitle']|//div[@class='front']//p[@pstyle='jrnlArtSubTitle']","BJO_MoGram",myDoc,15.5,15.5); // article tile | articleSub title
alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'jrnlAbsHead|jrnlAbsTitle_First|jrnlAbsTitle|TXT_CHAP_FIRST|TXT_CHAP_FIRST_Right|TXT_CHAP_FIRST_Left|PMS_jrnlAbsHead|jrnlAbsTitle|jrnlAbsPara|jrnlHead1_First|QUOTE-O|jrnlAuthors', 'ascent');
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
stackStubFrames();
alignParaTopLineImage("//div[@class='body']", "//pFig[@class='ALIGN_PARA_TOP']");
dublin_core_metadata();
