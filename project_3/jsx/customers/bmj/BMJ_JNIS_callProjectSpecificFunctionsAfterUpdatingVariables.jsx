﻿convertGrapicToPrintVersion(proof_type);
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlStubToCite']//span[@class='jrnlLPage']");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlToCite']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlToCite']//span[@class='jrnlLPage']");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlCLRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlCLRH']//span[@class='jrnlLPage']");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlCRRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlCRRH']//span[@class='jrnlLPage']");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlLRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlLRH']//span[@class='jrnlLPage']");
replaceLpageValueInToCite(":", "//*[@pstyle='jrnlRRH']//span[@class='jrnlFPage']", "–", "//*[@pstyle='jrnlRRH']//span[@class='jrnlLPage']");
changePrintConditionalTexttoeloc("//p[@pstyle='jrnlCategory']","Ischemic Stroke|Hemorrhagic Stroke|Neuroimaging|New Devices|Basic Science|Clinical Neurology|Spine|Socioeconomics|New Devices and Techniques|Open Surgery");
calcParaNFloatBounds();