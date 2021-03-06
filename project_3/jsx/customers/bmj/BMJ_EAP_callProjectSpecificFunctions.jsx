﻿alignStubFramesToAbsHead(myDoc, 'STUB_COLUMN', 'EPISTLE_jrnlAuthors|jrnlAbsHead|QUOTE-O_WITH_ATTRIB_FIRST|jrnlHead1_First|TXT_CHAP_FIRST|GERW_jrnlHead1_First|GERW_TXT_CHAP_FIRST|jrnlAuthors|jrnlAbsPara', 'ascent');
//~ moveNodesOnFrmToIntext('METAINFO', 'STUB_COLUMN', 'before', 'jrnlAffGroup', "//div[@class='back']", 'Author affiliations\r', 'jrnlAffHead', 'For numbered affiliations see end of article.\r', 'jrnlAff');
jrnlDateCommonStyle('jrnlReDate,jrnlRevDate,jrnlAcDate');
stackStubFrames();
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']|//p[@pstyle='EPILOGUE_jrnlAuthors']|//p[@pstyle='EPISTLE_jrnlAuthors']|//p[@pstyle='GERW_jrnlAuthors']");
moveBlockToColumnBottom(162.092, "//div[@class='jrnlFNTxtBlock']", 'TXT_FN');
placePhotos("//div[@class='body']", "//pFig[@class='ED_IMG']");
alignParaTopLineImage("//div[@class='body']", "//pFig[@class='ALIGN_PARA_TOP']");
removeOpenAccLogo("//p[@pstyle='jrnlLicense']");
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
addSpBeforePara('jrnlPresentAddrFN,jrnlCorrNoticeFN,jrnlSocialFN,jrnlAckGroup,jrnlNoteHeadFN,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlLicense,jrnlCopyrightStmt', 12);
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
dublin_core_metadata();