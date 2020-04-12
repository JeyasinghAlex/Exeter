eLifeAddBoxSideBar(layerTemplateScript, "//div[@class='jrnlBoxBlock']|//div[@class='jrnlPullQuoteBlock']");
spitFramesInAppBlock();
videoLogo("//div[@proof-type]","//div[@class='jrnlVidBlock']|//div[@class='jrnlVidBlockGroup']");
findDestPageAndHyperlink("//p//span[@cstyle='jrnlFundingPointer'],//h2[@pstyle='jrnlFundingHead']");
findDestPageAndHyperlink("//p//span[@cstyle='jrnlFundingPointer'],//h2[@pstyle='TEMPLATE5_jrnlFundingHead']");
findDestPageAndHyperlink("//p//span[@cstyle='jrnlCompIntPointer'],//h2[@pstyle='jrnlConfHead']");
Elife_splitFramesIntoTwoAndContPage("//p[@pstyle='jrnlKeyResourceTblHead']");
pageStartingFirstLineHeadRuleOff("//h1[@pstyle='jrnlRefHead']|//h1[@pstyle='jrnlAddFilesHead']|//h1[@pstyle='jrnlAddMaterialHead']");
