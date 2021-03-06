﻿alignStubFramesToAbsHead(myDoc, 'STUB_DOI', 'jrnlAbsHead|QUOTE-T|QUOTE-O|QUOTE-O_WITH_ATTRIB|TXT_CHAP_FIRST|EMONADDE_TXT_CHAP_FIRST|jrnlHead1_First|EMONADDE_jrnlHead1_First|jrnlAuthors|PMS_jrnlAbsHead|jrnlAbsPara|jrnlHead1_First', 'ascent');
stackStubFrames();
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']|//p[@pstyle='EESS_jrnlAuthors']|//p[@pstyle='EMONADDE_jrnlAuthors']");
removeOpenAccLogo("//p[@pstyle='jrnlLicense']");
_web_links("CrossMark_CMYK.eps|CrossMark_BW.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
placeInlineFigureParentParaTopLeft_or_Right("//matchEqn[@cstyle='FIG_INLINE_TEXT'][not(child::box-inline-fig[@cstyle='ORCID_IMAGE'])]|//pFig[@data-fig-inline='right']");
addSpBeforePara('jrnlPresentAddrFN,jrnlCorrNoticeFN,jrnlHandlingEditorFN,jrnlSocialFN1,jrnlSocialFN,jrnlAckGroup,jrnlNoteHeadFN,jrnlCollabFN,jrnlConFN,jrnlFundGroup,jrnlDisclaimerFN,jrnlConfFN,jrnlPatientFN,jrnlEthicsFN,jrnlPeerReviewFN,jrnlDataSharingFN,jrnlAuthorNoteFN,jrnlLicense,jrnlCopyrightStmt', 12);
findAndReplaceSpecialCharacter("MetaBoldCELF","Roman","ø","MetaPro","Bold");
findAndReplaceSpecialCharacter("ClassGarmnd BT","Roman","µ","Times New Roman","Regular");
findAndReplaceSpecialCharacter("Frutiger LT Pro","47 Light Condensed","'","Frutiger LT Pro","47 Light Condensed","’");
dublin_core_metadata();