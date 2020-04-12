//logoReplace(myDoc, "//p[@pstyle='jrnlArtTitle']", "jrnlTitle", layerTemplateScript);
//applyColor(myDoc, "//p[@pstyle='jrnlArtTitle']", "jrnlTitle");
removeTextFrameByName("REMOVEFRAME");
licenseLogoPlacinginFooter("//p[@pstyle='jrnlLicense']","MBS_CC-BY-NC.eps","MBS_CC-BY.eps","LICENSELOGO",/NonCommercial License/)
abstractBlockWithContinued(0, 0, "//div[@class='jrnlAbsGroup']", "Abstract head", "Abstract box",6,"STUB_COLUMN","ABS_BOX","ABS_OPEN_FRAME");
splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']");
mbsFootNoteSpaceBeforeRule('jrnlFundHead,jrnlAckHead,jrnlConfHead,jrnlEthicsHead', 18, true);
removeOpenAccLogo("//p[@pstyle='jrnlLicense']");
removeOpenDataLogoMBS();
changeExtlinkColorBasedOnArticleType("jgv","ictv virus taxonomy profile");
hyperlinktoJournalLogo("//div[@class='front']","JOURNAL_LOGO","journal-id-prefix");
addAboveRuleForFirstPara("//div[@class='jrnlStubBlock'][not(./child::p[@pstyle='jrnlHistory'])]//p[1]");