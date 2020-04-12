splitFramesIntoTwo("//p[@pstyle='TEMPLATE4_jrnlAuthors']|//p[@pstyle='TEMPLATE1_jrnlAuthors']|//p[@pstyle='TEMPLATE3_jrnlAuthors']");
Elife_reduceFirstFrameHt("//p[@pstyle='jrnlAbsBlockDOI']");
Elife_update_jrnlRefText_indentProperty();
tableFirstRowColorChange("//Table[@class='jrnlTblBlock']|//Table[@class='jrnlFunderTbl']|//Table[@class='KeyResourcesTbl']", "WHITE");
addSpBeforePara('jrnlBio', 6);