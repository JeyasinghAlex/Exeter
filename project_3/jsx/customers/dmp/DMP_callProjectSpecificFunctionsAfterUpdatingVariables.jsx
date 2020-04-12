placeOnlineBoxStmt("//p[@pstyle='jrnlRefText-B2']", 0, layerTemplateScript, 'ONLINE_STMTBOX', 407.603, "//p[@pstyle='jrnlCopyrightStmt']");
replaceFpageLpageValue("//span[@class='jrnlFPage']", "–", "//span[@class='jrnlLPage']");
queriesPagesWithQueryNumANchor(currDocInPrg,"//floatBlock//div[@class='jrnlQueryBlock']", "//div[@doi]", "doi");
calcParaNFloatBounds();