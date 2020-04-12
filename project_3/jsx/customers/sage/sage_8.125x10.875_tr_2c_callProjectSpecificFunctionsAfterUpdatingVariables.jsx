queriesPages(currDocInPrg,"//floatBlock//div[@class='jrnlQueryBlock']", "//div[@doi]", "doi");
BMJ_replaceLpageValue("–", "//*[@class='jrnlStubBlock']//span[@class='jrnlLPage']");
convertGrapicToPrintVersion(proof_type);
calcParaNFloatBounds();