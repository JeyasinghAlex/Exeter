logoReplace(myDoc, "//p[@pstyle='jrnlArtTitle']", "jrnlTitle", layerTemplateScript);
addNonBreakSpBeforeEmail("//span[@class='jrnlCorrEmail']|//span[@class='jrnlEmail']|//span[@class='jrnlCorrEmail']");
_web_links("CROSSMARK_BW_square_VERSO.eps|CROSSMARK_BW_square_RECTO.eps","//span[@class='jrnlDOI'],//p[@pstyle='jrnlDOI']");
logoResize('RECTO_Frontiers_Journal_LOGO,VERSO_Frontiers_Journal_LOGO');
hyperlink('//div[@doi]','VERSO_Frontiers_Journal_LOGO,RECTO_Frontiers_Journal_LOGO',{"fevo":"ecology_and_evolution","fgene":"genetics","fphys":"physiology","fpls":"plant_science","fcvm":"Cardiovascular_Medicine","fsurg":"surgery","frobt":"robotics-and-ai","fvets":"veterinary-science"});
update_jrnlRefText_indentProperty();
splitFrames_according_to_keywords("//span[@class='jrnlKeyword']");
registerMark("~r|~d","jrnlRegisterMark");
inlineFigCaption("//div[@class='jrnlFigBlock'][@data-inline='true']//p[@pstyle='jrnlFigCaption']",5.5);