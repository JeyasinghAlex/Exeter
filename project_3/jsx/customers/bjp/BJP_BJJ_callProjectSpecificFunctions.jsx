splitFramesIntoTwo("//p[@pstyle='jrnlAuthors']|//p[@pstyle='ILLUMINATIONS_jrnlAuthors']|//p[@pstyle='jrnlArtTitle']");
dublin_core_metadata();
addSpaceBeforeFirstParaInFn("//div[@class='jrnlRefGroup']/p[last()]/following::*");
addSpecialLogoBJJ("//div[@class='front']","//div[@proof-type]","The-Hip-Society|The-Knee-Society");
//addNonBreakSpBeforeEmail("//span[@class='jrnlEmail'][not(ancestor::div[@class='sub-article'])]|//p[@class='jrnlCorrAff'][not(ancestor::div[@class='sub-article'])]|//span[@class='jrnlCorrEmail'][not(ancestor::div[@class='sub-article'])]")
stackStubFrames();