<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="watermark"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
    <xsl:param name="journalID"/>
      <xsl:param name="subArticleID"/>
    <xsl:param name="cmsID"/>
    <xsl:param name="fpage"/>
    <xsl:param name="pageType"/>
	<xsl:param name="issueMakeup"/>
	<xsl:param name="issuePrefix"/>
    <xsl:param name="doi"/>
     <xsl:param name="stage"/>
    <xsl:param name="article">
        <emj>
            <type>Primary survey</type>
        </emj>
    </xsl:param>
    <xsl:variable name="journalList" as="element()*">
        <item>ebm</item>
        <item>ebn</item>
    </xsl:variable>
    <xsl:variable name="journalListForAffEmail" as="element()*">
        <item>
            <journal name="jfp">
                <articletype>Letter to the editor</articletype>
            </journal>
        </item>
    </xsl:variable>
    <xsl:output method="xml" indent="no"/>
    <xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="*[@*[contains(., 'Punc')]]|*[@*[contains(., removeString)]]">
        <xsl:variable name="class" select="./@class"/>
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./@startPunc">
                <xsl:choose>
                    <xsl:when test="@class='jrnlOnBehalfOf' or @class='jrnlCollaboration'">
                        <!--<xsl:text> </xsl:text>
                        <xsl:choose>
                            <xsl:when test="(../*[@class='jrnlOnBehalfOf'])[1] is ."/>
                            <xsl:otherwise>
                                <xsl:value-of select="./@startPunc"/>
                                <xsl:text> </xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>-->
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="./@startPunc"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
            <xsl:choose>
                <xsl:when test="@class='jrnlAuthor' or @class='jrnlOnBehalfOf' or @class='jrnlCollaboration'">
                    <xsl:choose>
                        <xsl:when test="../position() eq count(../*[@class='jrnlAuthorGroup'])-1">
                            <xsl:value-of select="./@penultimatePunc"/>
                        </xsl:when>
                        <xsl:when test="../following-sibling::*[@class='jrnlAuthorGroup']">
                            <xsl:value-of select="./@interPunc"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test="../following-sibling::*[@class='jrnlOnBehalfOf' or @class='jrnlCollaboration']">
                                <xsl:value-of select="../following-sibling::*[@class='jrnlOnBehalfOf' or @class='jrnlCollaboration'][1]/@startPunc"/>
                            </xsl:if>
                            <xsl:if test="@endPunc">
                                <xsl:value-of select="./@endPunc"/>
                            </xsl:if>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:choose>
                        <xsl:when test="position() eq count(../*[@class=$class])-1">
                            <xsl:value-of select="./@penultimatePunc"/>
                        </xsl:when>
                        <xsl:when test="following-sibling::*[@class=$class]">
                            <xsl:value-of select="./@interPunc"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test="@endPunc">
                                <xsl:value-of select="./@endPunc"/>
                            </xsl:if>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <!-- color attribute for author surname -->
    <xsl:template match="//div[@class='front' or @class='back']/p[@class='jrnlAuthors']/span[@class='jrnlAuthorGroup']//span[@class='jrnlSurName']" priority="5">
        <span class="jrnlSurName">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./@startPunc">
                <xsl:value-of select="./@startPunc"/>
            </xsl:if>
            <xsl:choose>
                <xsl:when test="$stage = 'Typesetter Check' or $stage='Author proof'">
                    <span>
                        <xsl:attribute name="data-background-color">
                            <xsl:text>247,183,211</xsl:text>
                        </xsl:attribute>
                        <xsl:apply-templates select="node()"/>
                    </span>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="./@endPunc">
                <xsl:value-of select="./@endPunc"/>
            </xsl:if>
        </span>
    </xsl:template>
   
    <xsl:template match="p[@class='jrnlSecPara']" priority="5">
        <xsl:choose>
            <xsl:when test="$articleType = 'Global Emergency Medicine Highlights' and $journal = 'emj' and name(preceding-sibling::*[1])='h2'">
                <p class="jrnlSecParaAuthors">
                    <xsl:apply-templates select="@*[name()!='class']|node()"/>
                </p>
            </xsl:when>
            <xsl:when test="$articleType = 'Global Emergency Medicine Highlights' and $journal = 'emj' and name(preceding-sibling::*[1])='h1'">
                <p class="jrnlSecParaSPL">
                    <xsl:apply-templates select="@*[name()!='class']|node()"/>
                </p>
            </xsl:when>
            <xsl:otherwise>
                <p class="jrnlSecPara">
                    <xsl:apply-templates select="@*[name()!='class']|node()"/>
                </p>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!--<xsl:template match="//div[@class='WordSection1']" priority="5">
        <div class="WordSection1" style="page: WordSection1;" id="contentDivNode" cmsID="{$cmsID}">
            <div class="main">
                <xsl:for-each select="//*[@class='jrnlFigBlock'][name((ancestor::*[@class='jrnlFigBlockGroup'])[last()]) = '']|//*[@class='jrnlVidBlock']|//*[@class='jrnlTblBlock'][name((ancestor::*[@class='jrnlTblBlockGroup'])[last()]) = '']|//*[@class='jrnlBoxBlock'][name((ancestor::*[@class='jrnlAbsPara'])[last()]) = '']|//*[@class='jrnlFigBlockGroup']|//*[@class='jrnlTblBlockGroup']|//*[@class='jrnlBoxBlockGroup']|//*[@class='jrnlFootNoteFN']">
                    <div class="floatBlock">
                        <xsl:apply-templates select="@*[name()!='class']"/>
                        <xsl:apply-templates select="."/>
                    </div>
                </xsl:for-each>
                <div class="doc">
                    <xsl:apply-templates/>
                </div>
            </div>
        </div>
    </xsl:template>-->
    <xsl:template match="//div[@class='front']" priority="5">
    <xsl:variable name="journal-id">
            <xsl:choose>
                <xsl:when test="$journalID != '' ">
                    <xsl:value-of select="$journalID"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$journal"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
         <xsl:variable name="fpage">
            <xsl:choose>
                <xsl:when test="$issuePrefix != ''">
                    <xsl:value-of select="concat($issuePrefix,replace($fpage,'[a-z]+',''))"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$fpage"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
		<xsl:variable name="article-doi" select=".//*[@class='jrnlDOI'][1]|./following-sibling::*[@class='back'][1]//*[@class='jrnlDOI'][1]"/>
        <xsl:variable name="current-doi">
            <xsl:choose>
                <xsl:when test="$article-doi[1] != ''">
                    <xsl:value-of select="tokenize($article-doi[1],'/')[last()]"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <div class="front" cmsID="{$cmsID}" doi="{$current-doi}" journal-id="{$journal-id}" fpage="{$fpage}" proof-type="{$proof}" watermark="{$watermark}">
            <!--<xsl:apply-templates select="@*|node()"/> -->
             <xsl:apply-templates select="@*[name()!='journal-id' and name()!='fpage' and name()!='doi']"/>
        <xsl:choose>
       
                <xsl:when test="$issuePrefix != ''">
                    <xsl:attribute name="data-page-type">
                        <xsl:value-of select="'sissue'"/>
                    </xsl:attribute>
                </xsl:when>
                 <xsl:when test="$pageType != ''">
                <xsl:attribute name="data-page-type">
                    <xsl:value-of select="$pageType"/>
                </xsl:attribute>
            </xsl:when>
            </xsl:choose>
            <xsl:if test="$subArticleID != ''">
                <xsl:attribute name="data-subarticle-doi">
                    <xsl:value-of select="$subArticleID"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
			<xsl:if test="//*[@type='main']/*[@class='doc'][./*[@class='back']/*[@class='jrnlCopyrightStmt'][@data-statement='new']]/div[@class='front'][./div[@class='jrnlStubBlock']][./div[@class='jrnlMetaInfo']]">
                <div class="jrnlCopyrightStmtInfo">
                    <p>
                        <xsl:choose>
                            <xsl:when test="$journal = 'aim' or $journal = 'bmjinnov' or $journal = 'bmjqs' or $journal = 'bmjspcare' or $journal = 'bmjsrh' or $journal = 'fg' or $journal = 'jfp' or $journal = 'pn'">
                                <xsl:attribute name="class">
                                    <xsl:value-of select="'STUB_jrnlCopyrightStmt'"/>
                                </xsl:attribute>
                                <xsl:apply-templates select="../*[@class='back']/*[@class='jrnlCopyrightStmt'][@data-statement='new']/@*[name()!='class']"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:apply-templates select="../*[@class='back']/*[@class='jrnlCopyrightStmt'][@data-statement='new']/@*"/>
                            </xsl:otherwise>
                        </xsl:choose>
                        <xsl:apply-templates select="../*[@class='back']/*[@class='jrnlCopyrightStmt'][@data-statement='new']/node()"/>
                    </p>
                </div>
            </xsl:if>
        </div>
    </xsl:template>
     <!-- remove lpage(starts with 'e') from footer and to cite-->
    <xsl:template match="//*[@class='jrnlLRH' or @class='jrnlRRH' or @class='jrnlCRRH' or @class='jrnlCLRH' or @class='jrnlStubToCite' or @class='jrnlToCite']//*[@class='jrnlLPage'][starts-with(.,'e')]" priority="5"/>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsGroup']" priority="5">
        <xsl:if test="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
            <xsl:for-each select="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
                <div class="jrnlAbsBox">
                    <xsl:apply-templates select="./@*|./*"/>
                </div>
            </xsl:for-each>
        </xsl:if>
        <div class="jrnlAbsGroup">
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <!--remove lpage when fpage and lpage are same  
    <xsl:template match="//*[@class='jrnlLRH' or @class='jrnlRRH' or @class='jrnlCRRH' or @class='jrnlCLRH' or @class='jrnlStubToCite' or @class='jrnlToCite']//*[@class='jrnlLPage'][not(starts-with(.,'e'))]" priority="5">
    <xsl:variable name="fpageVal" select="//*[@class='jrnlLRH']//*[@class='jrnlFPage']"/>
    <xsl:variable name="lpage" select="//*[@class='jrnlLRH']//*[@class='jrnlLPage']"/>
    <xsl:choose>
    <xsl:when test="$fpageVal = $lpage"/>
    <xsl:otherwise>
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="@*"/>
                <xsl:if test="./@startPunc">
                    <xsl:value-of select="./@startPunc"/>
                </xsl:if>
            <xsl:apply-templates select="node()"/>
            <xsl:if test="./@endPunc">
                <xsl:value-of select="./@endPunc"/>
            </xsl:if>
        </xsl:element>
    </xsl:otherwise>
    </xsl:choose>
  </xsl:template> -->
    <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'bmjacademic'">
                <xsl:element name="{./name()}">
					<xsl:apply-templates select="@*|node()"/>
				</xsl:element>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<xsl:template match="//div[@class='front']//p[@class='jrnlAbsPara'][not(./*[@class='jrnlAbsBox'])]" priority="5">
	    <xsl:choose>
            <xsl:when test="$journal = 'bmjacademic'">
                <xsl:element name="{./name()}">
					<xsl:apply-templates select="@*|node()"/>
				</xsl:element>
            </xsl:when>
            <xsl:otherwise>
        	    <p>
                    <xsl:apply-templates select="@*"/>
                    <xsl:if test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                        <span>
                            <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*|./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
                        </span>
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:apply-templates select="node()"/>
                </p>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
   <!-- <xsl:template match="//div[@class='jrnlRelatedInfo']" priority="6">
        <xsl:choose>
		     <xsl:when test="$proof='print'">
                <div class="jrnlRelatedInfo">
                    <xsl:apply-templates select="@*|node()"/>
                </div>
            </xsl:when>
			<xsl:otherwise>
			</xsl:otherwise>
        </xsl:choose>
    </xsl:template> -->
    <xsl:template match="//*[@class='jrnlRelArt'][not(preceding-sibling::*[@class='jrnlRelArt'])]" priority="5">
        <xsl:choose>
            <xsl:when test="./@xlink:href!=''">
                <div class="jrnlRelatedInfo">
                    <xsl:variable name="logosrc" select="concat('{.}../logos/',$proof,'/RELATED_ARTICLE.eps')"/>
                    <img src="{$logosrc}" class="REL_IMAGE"/>
                    <p class="jrnlRelatedArticle">
                            <xsl:apply-templates select=" @*[name()!='class'][name()!='xlink:href']"/>
                            <xsl:value-of select="./@xlink:href"/>
                    </p>
				    <xsl:for-each select=".//following-sibling::*[@class='jrnlRelArt']">
                        <p class="jrnlRelatedArticle">
                            <xsl:apply-templates select=" @*[name()!='class'][name()!='xlink:href']"/>
                            <xsl:value-of select="./@xlink:href"/>
                        </p>
					</xsl:for-each>
                </div>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<xsl:template match="//*[@class='jrnlRelArt'][preceding-sibling::*[@class='jrnlRelArt']]" priority="5"/>
	<xsl:template match="//img[@class='REL_IMAGE']|//img[@class='jrnlCrossMarkLogo']|//img[not(@class) and not(@id) and not(@alt)]" priority="5">
         <img>
        <xsl:if test="./@src">
                <xsl:attribute name="src">
                    <xsl:value-of select="replace(./@src,'online',$proof)"/>
                </xsl:attribute>
        </xsl:if>
        <xsl:if test="./@class">
                <xsl:attribute name="class">
                    <xsl:value-of select="./@class"/>
                </xsl:attribute>
        </xsl:if>
        </img>
    </xsl:template>
    <!-- floats label -->
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="concat(.,' ')"/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
        </span>
    </xsl:template>
<!--
    <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
        <xsl:variable name="id" select="./@data-citation-string"/>
         <xsl:variable name="citationid" select="replace($id, '^\s+|\s+$', '')"/>
         <xsl:variable name="currnode" select="current()"/>
        <xsl:variable name="flag"> -->
           <!-- <xsl:for-each select="//*[@class='jrnlFirstCitation']">
                <xsl:choose>
                    <xsl:when test="contains(./@data-rid,$id)">true</xsl:when>
                         <xsl:otherwise>false</xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>  -->
           <!-- <xsl:for-each select="tokenize($citationid,' ')">
                <xsl:variable name="currentCitationID" select="."/>
                    <xsl:choose>
                        <xsl:when test="$currnode/preceding::span[@class='jrnlFirstCitation'][contains(./@data-rid, $currentCitationID)]">true</xsl:when>
                        <xsl:when test="$currnode/following::span[@class='jrnlFirstCitation'][contains(./@data-rid, $currentCitationID)]">true</xsl:when>
                        <xsl:otherwise>false</xsl:otherwise>
                    </xsl:choose>
           </xsl:for-each>
        </xsl:variable>
        <xsl:variable name="curCitationId" select="./@data-citation-string"/>
       <xsl:if test="./@data-anchor = 'true'  and not(contains($flag,'true')) and $curCitationId !=''">
            <span class="jrnlFirstCitation" data-rid="{./@data-citation-string}"/>
        </xsl:if> 
        <span class="{./@class}" data-citation-string="{./@data-citation-string}">
            <xsl:variable name="id" select="replace($id, '^\s*(.+?)\s*$', '$1')"/>
            <xsl:variable name="id" select="replace($id, '\s', ',')"/>
            <xsl:variable name="node" select="current()"/>
            <xsl:variable name="citationText" select="replace(., '^(Figures?|Tables?|Videos?|Box)\s', '$1 ', 'i')"/>
            <xsl:for-each select="tokenize($id,',')">
                <xsl:variable name="currentID" select="."/>
                <xsl:choose>
                    <xsl:when test="$node/preceding::span[contains(@data-citation-string, $currentID)]"/>
                    <xsl:otherwise>
                        <xsl:attribute name="data-citation-first" select="'true'"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
            <xsl:value-of select="$citationText"/>
        </span>
    </xsl:template> -->
    <xsl:template match="//span[@class='jrnlSupplRef'][.!='']" priority="5">
        <span class="{./@class}" data-citation-string="{./@data-citation-string}">
            <xsl:apply-templates select="@*"/>
            <a href="https://dx.doi.org/10.1136/{$doi}">
                <xsl:apply-templates/>
            </a>
        </span>
    </xsl:template>
    <xsl:template match="//table/tbody" priority="5">
        <xsl:variable name="maxCells">
            <xsl:for-each select="tr">
                <xsl:sort select="sum(td/@colspan) + count(td[not(@colspan)])" order="descending"/>
                <xsl:if test="position() = 1">
                    <xsl:value-of select="sum(td/@colspan) + count(td[not(@colspan)])"/>
                </xsl:if>
            </xsl:for-each>
        </xsl:variable>
        <tbody>
            <xsl:apply-templates select="@* | node()"/>
            <xsl:if test="../../p[@class='jrnlTblFoot']">
                <tr>
                    <td colspan="{$maxCells}">
                        <xsl:for-each select="../../p[@class='jrnlTblFoot']">
                            <p class="jrnlTblFoot">
                                <xsl:apply-templates select="@*|node()"/>
                            </p>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:if>
        </tbody>
    </xsl:template>
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefJournalTitle']|//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefBookTitle']" priority="5">
       <!-- <xsl:variable name="class" select="./@class"/> -->
       <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="./../span[@class='RefWebsite' or @class='RefDOI']">
                    <xsl:value-of select="replace(./../span[@class='RefWebsite' or @class='RefDOI'],'doi:','')"/> 
                </xsl:when>
                <xsl:when test="../@data-pmid">
                    <xsl:value-of select="../@data-pmid"/>
                 </xsl:when>
            </xsl:choose>
        </xsl:variable>
        <xsl:variable name="doi" select="replace($doi,' ','%20')"/>
        <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="not(starts-with($doi, 'http://'))">http://dx.doi.org/<xsl:value-of select="$doi"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
         <xsl:variable name="class">
        <xsl:choose>
         <xsl:when test="./@class='RefJournalTitle'">
          <xsl:choose>
                <xsl:when test="./../span[@class='RefWebsite' or @class='RefDOI']|../@data-pmid">
                 <xsl:value-of select="./@class"/>
                </xsl:when>
                 <xsl:otherwise>
                 <xsl:value-of select="concat(./@class,'_NoLink')"/>
                 </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="./@class"/>
            </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <span class="{$class}">
            <xsl:choose>
                <xsl:when test="./../span[@class='RefWebsite' or @class='RefDOI']|../@data-pmid">
                    <a href="{$doi}">
                        <xsl:apply-templates/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                        <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefWebsite' or @class='RefDOI'][not(./following-sibling::*[@class])]" priority="5">
        <xsl:choose>
            <xsl:when test="$proof='print' and ./../@removeDOIForPrint='true'"/>
            <xsl:when test="$proof='online' and ./../@removeDOIForOnline='true'"/>
            <xsl:otherwise>
                <span class="RefWebsite">
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> 
   <!--   <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefJournalTitle']|//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefBookTitle']" priority="5">
     
        <xsl:variable name="doi" select="replace(./../span[@class='RefDOI'],'doi:','')"/>
        <xsl:variable name="doi" select="replace($doi,' ','%20')"/>
        <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="not(starts-with($doi, 'http://'))">http://dx.doi.org/<xsl:value-of select="$doi"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
         <xsl:variable name="class">
        <xsl:choose>
         <xsl:when test="./@class='RefJournalTitle'">
          <xsl:choose>
                <xsl:when test="./../span[@class='RefDOI']">
                 <xsl:value-of select="./@class"/>
                </xsl:when>
                 <xsl:otherwise>
                 <xsl:value-of select="concat(./@class,'_NoLink')"/>
                 </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="./@class"/>
            </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <span class="{$class}">
            <xsl:choose>
                <xsl:when test="./../span[@class='RefDOI']">
                    <a href="{$doi}">
                        <xsl:apply-templates/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/span[@class='RefWebsite' or @class='RefDOI']" priority="5">
        <xsl:choose>
            <xsl:when test="$proof='print' and ./../@removeDOIForPrint='true'"/>
            <xsl:when test="$proof='online' and ./../@removeDOIForOnline='true'"/>
            <xsl:otherwise>
                <span class="RefWebsite">
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>-->
    <!-- -->
    <xsl:template match="div[@class='front' or @class='back']//*[@class='jrnlAffGroup'][@removeAffLabel='true']" priority="5">
	<xsl:element name="{name(.)}">
	<xsl:apply-templates select="@*"/>
	<xsl:choose>
		<xsl:when test="count(.//*[@class='jrnlAff']) = 1">
			<xsl:for-each select=".//*[@class='jrnlAff']">
				<xsl:element name="{name(.)}">
				<xsl:apply-templates select="@*|node()except(*[@class='jrnlAffLabel'])"/>
				</xsl:element>
			</xsl:for-each>
		</xsl:when>
		<xsl:otherwise>
			<xsl:apply-templates select="@*|node()"/>
		</xsl:otherwise>
	</xsl:choose> 
	</xsl:element>
</xsl:template>
 <!-- remove ext-link for supplement fn-->
  <xsl:template match="//*[@class='jrnlSupplementFNPara']/*[@class='jrnlExtLink']" priority="5">
      <xsl:apply-templates/> 
 </xsl:template>
    <!-- <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/*[@class='RefAuthor'][1]|//div[@class='back']/p[@class='jrnlRefText']/*[@class='RefCollaboration'][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">
                    <xsl:apply-templates select="@*"/>
                    <span class="RefFirstAuthor">
                        <xsl:value-of select="."/>
                    </span>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template> -->
    <xsl:template match="//div[@class='back']//p[@class='jrnlRefText']/*[@class='RefAuthor']|//div[@class='back']//p[@class='jrnlRefText']/*[@class='RefCollaboration']|//div[@class='back']//p[@class='jrnlRefText']/*[@class='RefEditor']" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:choose>
                <xsl:when test="not(./preceding-sibling::*)">
                    <xsl:choose>
                         <xsl:when test="$journalList[contains(., $journal)]">
                            <xsl:apply-templates select="@*"/>
                             <span class="RefFirstAuthor">
                                 <xsl:value-of select="."/>
                            </span>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:apply-templates select="@*|node()"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
	<!-- Display Reference based on proof type -->
    <xsl:template match="//div[@class='jrnlRefGroup'][@removeRefForPrint='true']" priority="6">
        		<xsl:variable name="refNoteHref" select="concat('http://',$journal,'.bmj.com')"/>
                <xsl:choose>
                    <xsl:when test="$proof='print'">
                        <p class="jrnlRefNote">
                            <xsl:text>References to this paper are available online at </xsl:text>
                            <a href="{$refNoteHref}">
                                <xsl:value-of select="$refNoteHref"/>
                            </a>
                        </p>
                    </xsl:when>
            <xsl:otherwise>
                <div class="jrnlRefGroup">
                    <xsl:apply-templates select="@*|node()"/>
              </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!--- end -->
    <xsl:template match="//p[@class='jrnlCorrAffHead']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'ebmh' and $articleType = 'commentary' and count(//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']) = 1"/>
            <xsl:when test="not(//*[@class='jrnlAffGroup'])">
                <xsl:choose>
                    <xsl:when test="./preceding-sibling::*[1][@class]">
                        <p class="jrnlCorrAffHead">
                            <xsl:value-of select="./@startPunc"/>
                            <xsl:apply-templates/>
                            <xsl:value-of select="./@endPunc"/>
                        </p>
                    </xsl:when>
                    <xsl:otherwise>
                        <p class="jrnlCorrAffHeadNoAff">
                            <xsl:apply-templates/>
                        </p>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:when test="//*[@class='jrnlAffGroup']">
                <xsl:choose>
					<xsl:when test="//div[@class='front'][./*[@class='jrnlAuthors'][@data-remove-pdfDisplay='allAuthors']]">
                         <p class="jrnlCorrAffHeadNoAff">
                            <xsl:apply-templates/>
                        </p>
                    </xsl:when>
                    <xsl:when test="count(//*[@class='jrnlAffGroup'][@retainAff='true']//*[@class='jrnlAff']) = 1">
                        <xsl:variable name="affNode">
                            <xsl:for-each select="//*[@class='jrnlAffGroup']//*[@class='jrnlAff']">
                				<xsl:element name="{name(.)}">
                				    <xsl:apply-templates select="@*|node()except(*[@class='jrnlAffLabel'])"/>
                				</xsl:element>
                			</xsl:for-each>
            			</xsl:variable>
                    	<xsl:variable name="corresAff">
                    	    <xsl:value-of select="//*[@class='jrnlCorrAff']"/>
                    	</xsl:variable>
                    	<xsl:variable name="corresAff" select="replace($corresAff,',','')"/>
                    	<xsl:variable name="AffData" select="replace($affNode,',', '')"/>
                    	<xsl:variable name="AffData" select="replace($AffData,'^\s','')"/> 
                    	<xsl:choose>
                    	    <xsl:when test="contains($corresAff, $AffData)">
                    	        <p class="jrnlCorrAffHeadNoAff">
                                    <xsl:apply-templates/>
                                </p>
                    	    </xsl:when>
                    	    <xsl:otherwise>
                    	        <p class="jrnlCorrAffHead">
                                    <xsl:value-of select="./@startPunc"/>
                                    <xsl:apply-templates/>
                                    <xsl:value-of select="./@endPunc"/>
                                </p>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:when>
                    <xsl:otherwise>
                        <p class="jrnlCorrAffHead">
                            <xsl:value-of select="./@startPunc"/>
                            <xsl:apply-templates/>
                            <xsl:value-of select="./@endPunc"/>
                        </p>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="img[@src][@alt][not(@class='REL_IMAGE' or @class='jrnlCrossMarkLogo')][not(parent::*[(matches(@class, 'jrnl(.*?)Block'))])]" priority="5">
        <img>
            <xsl:apply-templates select=" @* "/>
            <xsl:if test="contains(./@src,'http://')">
                    <xsl:attribute name="data-img-src">
                            <xsl:value-of select="concat('{.}../',substring-after(./@src,'http://'))"/>
                        </xsl:attribute>
                </xsl:if>
            <xsl:apply-templates select=" node()"/>
        </img>
    </xsl:template>
    <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
           <xsl:for-each select="./img">
            <xsl:element name="img">
                <xsl:if test="./@class">
                    <xsl:attribute name="class">
                        <xsl:value-of select="./@class"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="./@id">
                    <xsl:attribute name="id">
                        <xsl:value-of select="./@id"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="src">
                    <xsl:value-of select="./@src"/>
                </xsl:attribute>
                 <xsl:if test="contains(./@src,'http://')">
                    <xsl:attribute name="data-img-src">
                            <xsl:value-of select="concat('{.}../',substring-after(./@src,'http://'))"/>
                        </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="alt">
                    <xsl:value-of select="./@alt"/>
                </xsl:attribute>
                <xsl:apply-templates select="./@*[contains(name(.), 'data-')]"/>
                </xsl:element>
            </xsl:for-each>
            <xsl:apply-templates select=" node()except(//img)"/>
        </div>
    </xsl:template>
    <xsl:template match="*[@class='jrnlVidBlock']" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
            <xsl:apply-templates select="./img"/>
            <xsl:apply-templates select="./*[@class='jrnlVidCaption']"/>
        </div>
    </xsl:template>
    <xsl:template match="//div[@type='main']" priority="5">
        <div type="main">
            <!-- create floatblock for query -->
            <xsl:if test="//*[@class='jrnlQueryRef']">
				<div class="floatBlock" id="BLK_AQ" data-stream-name="a_AQ">
					<div class="jrnlQueryBlock" id="BLK_AQ" data-id="BLK_AQ" data-stream-name="a_AQ" type="Query">
						<table data-class="jrnlQueryTbl">
							<thead>
								<tr>
									<th width="34">
										<p class="jrnlQuerySINoHead">No</p>
									</th>
									<th width="475.76">
										<p class="jrnlCustomMetaQueryHead">Query</p>
									</th>
								</tr>
							</thead>
							<tbody>
								<xsl:for-each select="//*[@class='jrnlQueryRef'][@data-type='start'][not(@data-replied='true')]">
									<xsl:variable name="pid" select="position()"/>
									<xsl:variable name="citationID" select="concat(' AQ',$pid,' ')"/>
									<xsl:variable name="currNode" select="@data-citation-string"/>
									
									<xsl:for-each select="//*[@class='jrnlQueryRef'][@data-citation-string=$citationID]">
										<xsl:variable name="rid" select="@data-rid"/>
										<xsl:variable name="queryNode" select="//*[@class='jrnlCustomMetaGroup']//*[@class='jrnlCustomMetaQuery'][@id=$rid]"/>
										<tr>
											<td>
												<p class="jrnlQuerySINo">
													<span class="jrnlQueryTblRef">
														<xsl:apply-templates select="@*[name()='data-citation-string']"/>
														<xsl:value-of select="concat('AQ',$pid)"/>
													</span>
												</p>
											</td>
											<td>
												<p>
													<xsl:apply-templates select="$queryNode/@*"/>
													<xsl:apply-templates select="$queryNode/node()"/>
												</p>
											</td>
										</tr>
									</xsl:for-each>
								</xsl:for-each>
							</tbody>
						</table>
					</div>
				</div>
			</xsl:if>
        
         <xsl:variable name="subArticle" select="//*[@class='sub-article'][@runOn-type='continue']"/>
            <xsl:for-each select="./*[@class='doc']/*[@class='body']//*[@class='jrnlBoxBlock'][name((ancestor::*[@class='jrnlAbsPara'])[last()]) = '']|./*[@class='doc']/*[@class='jrnlBoxBlockGroup']|./*[@class='doc']/*[@class='back']/*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']|$subArticle/*[@class='body']/*[@class='doc']//*[@class='jrnlBoxBlock'][name((ancestor::*[@class='jrnlAbsPara'])[last()]) = '']|$subArticle//*[@class='jrnlBoxBlockGroup']|$subArticle/*[@class='back']/*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']">
                <div class="floatBlock">
                    <xsl:apply-templates select="@*[name()!='class']"/>
                <xsl:element name="{./name()}">
                    <xsl:variable name="type">
                        <xsl:choose>
                            <xsl:when test="./@data-type-old">
                                <xsl:value-of select="@data-type-old"/>
                            </xsl:when>
                            <xsl:otherwise>TYPE1</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:choose>
                        <xsl:when test="count(preceding-sibling::*[@class!='jrnlBoxBlock']) = 0">
                            <xsl:choose>
                                <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$type"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:variable name="key">
                                        <xsl:choose>
                                            <xsl:when test="./@data-type-old">
                                                <xsl:value-of select="@data-type-old"/>
                                            </xsl:when>
                                            <xsl:otherwise>KEY</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    <xsl:variable name="seq" select="count(preceding-sibling::*)"/>
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$key"/>
                                    </xsl:attribute>
                                    <xsl:choose>
                                        <xsl:when test="$seq &gt; 0">
                                            <xsl:attribute name="data-stack">
                                                <xsl:value-of select="'true'"/>
                                            </xsl:attribute>
                                        </xsl:when>
                                        <xsl:otherwise/>
                                    </xsl:choose>
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:apply-templates select="./@*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                        </xsl:when>
                        <xsl:when test="count(following-sibling::*[@class!='jrnlBoxBlock']) = 0">
                            <xsl:choose>
                                <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$type"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:variable name="keyBack">
                                        <xsl:choose>
                                            <xsl:when test="./@data-type-old">
                                                <xsl:value-of select="@data-type-old"/>
                                            </xsl:when>
                                            <xsl:otherwise>KEY_BACK</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$keyBack"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="data-inline">
                                        <xsl:value-of select="'true'"/>
                                    </xsl:attribute>
                                    <xsl:choose>
                                        <xsl:when test="preceding-sibling::*[1][contains(@class, 'jrnlBoxBlock')][not(.//*[@class='label'])]">
                                            <xsl:attribute name="data-stack">
                                                <xsl:value-of select="'true'"/>
                                                </xsl:attribute>
                                            </xsl:when>
                                            <xsl:otherwise/>
                                        </xsl:choose>
                                    </xsl:otherwise>
                                </xsl:choose>
                            <xsl:apply-templates select="./@*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]|.//*[@class!='label']">
                                <xsl:attribute name="data-type">
                                    <xsl:value-of select="$type"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:apply-templates select="./@* "/>
                        </xsl:otherwise>
                    </xsl:choose>
                <xsl:apply-templates select="./node()"/>
                </xsl:element>
                </div>
            </xsl:for-each>
            <!-- after Commentary head all data moving to div for picket article type-->
            <xsl:for-each select="//h1[@class='jrnlHead1'][starts-with(.,'Commentary')]">
                <xsl:choose>
                    <xsl:when test="$articleType = 'picket' and $journal = 'eap'">
                        <div class="CommentaryBlock">
                            <xsl:for-each select="//*[@class='jrnlSecPara'][preceding-sibling::h1[1][starts-with(.,'Commentary')]]|//*[@class='jrnlHead2'][preceding-sibling::h1[1][starts-with(.,'Commentary')]]">
                                <xsl:element name="{name(.)}">
                                    <xsl:choose>
                                        <xsl:when test="position()=1 and ./@class='jrnlSecPara'">
                                            <xsl:attribute name="data-spl-style" select="'PICKET_COMMENTARY_TXT_CHAP_FIRST'"/>
                                        </xsl:when>
                                        <xsl:when test="position()!=1 and ./@class='jrnlSecPara' and preceding-sibling::*[1]/matches(@class,'jrnl(.*?)Para')">
                                            <xsl:attribute name="data-spl-style" select="'PICKET_COMMENTARY_TXI'"/>
                                        </xsl:when>
                                        <xsl:when test="position()!=1 and ./@class='jrnlSecPara' and preceding-sibling::*[1]/matches(@class,'jrnl(.*?)Head')">
                                            <xsl:attribute name="data-spl-style" select="'PICKET_COMMENTARY_TXT'"/>
                                        </xsl:when>
                                        <xsl:when test="position()!=1 and ./(matches(@class,'jrnl(.*?)Head'))">
                                            <xsl:variable name="head">
                                                <xsl:value-of select="concat('COMMENTARY_',./@class)"/>
                                            </xsl:variable>
                                            <xsl:attribute name="data-spl-style" select="$head"/>
                                        </xsl:when>
                                        <xsl:otherwise>
                                    </xsl:otherwise>
                                    </xsl:choose>
                                    <xsl:apply-templates select="@*|node()"/>
                                </xsl:element>
                            </xsl:for-each>
                            <div class="back1">
                                <xsl:apply-templates select="//*[@class='back']/@*|//*[@class='back']/node()"/>
                            </div>
                        </div>
                    </xsl:when>
                </xsl:choose>
            </xsl:for-each>
			<xsl:for-each select="//*[@class='jrnlBio'][@data-custom-jrnlBio]">
                <div class="floatBlock">
                    <div class="jrnlEditorImgBlock">
                        <xsl:variable name="biography" select=".//*[@class='jrnlBiography']/node()"/>
                        <xsl:choose>
							<xsl:when test=".//*[@class='jrnlFigBlock']">
							   <img class="">
									<xsl:attribute name="src">
										<xsl:value-of select="./*[@class='jrnlFigBlock']//img/@src"/>
									</xsl:attribute>
									<xsl:attribute name="alt">
										<xsl:value-of select="./*[@class='jrnlFigBlock']//img/@alt"/>
									</xsl:attribute>
								</img>
							</xsl:when>
							<xsl:when test=".//img[not(parent::p[@class='jrnlBiography'])]">
							   <img class="">
									<xsl:attribute name="src">
										<xsl:value-of select=".//img/@src"/>
									</xsl:attribute>
									<xsl:attribute name="alt">
										<xsl:value-of select=".//img/@alt"/>
									</xsl:attribute>
								</img>
							</xsl:when>
							<xsl:otherwise>
							</xsl:otherwise>
						</xsl:choose>
                        <xsl:if test="$biography !=''">
                            <p class="jrnlEditorImgCaption">
                                <xsl:apply-templates select="$biography"/>
                            </p>
                        </xsl:if>
                    </div>
                </div>
			</xsl:for-each>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
	<xsl:template match="//*[@class='jrnlBio'][@data-custom-jrnlBio]" priority="5"/>
    <xsl:template match="//div[@class='sub-article'][not(@runOn-type='continue')]" priority="5">
        
            <xsl:for-each select="./*[@class='body']//*[@class='jrnlBoxBlock'][name((ancestor::*[@class='jrnlAbsPara'])[last()]) = '']|./*[@class='jrnlBoxBlockGroup']|./*[@class='back']/*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']">
                <div class="floatBlock">
                    <xsl:apply-templates select="@*[name()!='class']"/>
                <xsl:element name="{./name()}">
                    <xsl:variable name="type">
                        <xsl:choose>
                            <xsl:when test="./@data-type-old">
                                <xsl:value-of select="@data-type-old"/>
                            </xsl:when>
                            <xsl:otherwise>TYPE1</xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:choose>
                        <xsl:when test="count(preceding-sibling::*[@class!='jrnlBoxBlock']) = 0">
                            <xsl:choose>
                                <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$type"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:variable name="key">
                                        <xsl:choose>
                                            <xsl:when test="./@data-type-old">
                                                <xsl:value-of select="@data-type-old"/>
                                            </xsl:when>
                                            <xsl:otherwise>KEY</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    <xsl:variable name="seq" select="count(preceding-sibling::*)"/>
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$key"/>
                                    </xsl:attribute>
                                    <xsl:choose>
                                        <xsl:when test="$seq &gt; 0">
                                            <xsl:attribute name="data-stack">
                                                <xsl:value-of select="'true'"/>
                                            </xsl:attribute>
                                        </xsl:when>
                                        <xsl:otherwise/>
                                    </xsl:choose>
                                </xsl:otherwise>
                            </xsl:choose>
                            <xsl:apply-templates select="./@*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                        </xsl:when>
                        <xsl:when test="count(following-sibling::*[@class!='jrnlBoxBlock']) = 0">
                            <xsl:choose>
                                <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$type"/>
                                    </xsl:attribute>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:variable name="keyBack">
                                        <xsl:choose>
                                            <xsl:when test="./@data-type-old">
                                                <xsl:value-of select="@data-type-old"/>
                                            </xsl:when>
                                            <xsl:otherwise>KEY_BACK</xsl:otherwise>
                                        </xsl:choose>
                                    </xsl:variable>
                                    <xsl:attribute name="data-type">
                                        <xsl:value-of select="$keyBack"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="data-inline">
                                        <xsl:value-of select="'true'"/>
                                    </xsl:attribute>
                                    <xsl:choose>
                                        <xsl:when test="preceding-sibling::*[1][contains(@class, 'jrnlBoxBlock')][not(.//*[@class='label'])]">
                                            <xsl:attribute name="data-stack">
                                                <xsl:value-of select="'true'"/>
                                                </xsl:attribute>
                                            </xsl:when>
                                            <xsl:otherwise/>
                                        </xsl:choose>
                                    </xsl:otherwise>
                                </xsl:choose>
                            <xsl:apply-templates select="./@*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]|.//*[@class!='label']">
                                <xsl:attribute name="data-type">
                                    <xsl:value-of select="$type"/>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:apply-templates select="./@* "/>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:apply-templates select="./node()"/>
                </xsl:element>
                </div>
            </xsl:for-each>
            <xsl:element name="{./name()}">
                <xsl:apply-templates select="./@*|./node()"/>
            </xsl:element>
</xsl:template>
    <!--<xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>-->
            <!--<xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">-->
           <!-- <xsl:for-each select="preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each>-->
            <!--    </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>-->
       <!-- </xsl:element>
    </xsl:template> -->
    <!-- <xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][last()]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/> -->
            <!--<xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">-->
            <!--<xsl:for-each select="following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>-->
            <!--</xsl:for-each>
                </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>
        </xsl:element>
    </xsl:template> -->
	<xsl:template match="//*[@class='body' or @class='back']//*[@class='jrnlBoxBlock']" priority="6"/>
    <!-- <xsl:template match="div[@class='back'][.//*[@class='jrnlBoxBlock']]" priority="5"> -->
   <!-- <xsl:template match="//div[@class='back'][.//*[@class='jrnlBoxBlock']]//p[not(ancestor::*[matches(./@class, 'jrnl(.*?)Block')])][last()]" priority="5"> -->
    <xsl:template match="//div[@class='back'][.//*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]//p[not(ancestor::*[matches(./@class, 'jrnl(.*?)Block')])][not(./following-sibling::*)]|//div[@class='doc'][.//*[@class='body']//*[@class='jrnlBoxBlock'][not(.//*[@class='label'])][not(./following-sibling::*)]]//div[@class='back']//p[not(@class='jrnlCopyrightStmt')][not(ancestor::*[matches(./@class, 'jrnl(.*?)Block')])][not(./following-sibling::*)]" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
           
            <xsl:if test="./@startPunc">
                <xsl:value-of select="./@startPunc"/>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
            <xsl:if test="./@endPunc">
                <xsl:value-of select="./@endPunc"/>
            </xsl:if>
          <!-- <xsl:for-each select="div[@class='jrnlAppBlock'][./*[@class='jrnlBoxBlock']]"> -->
          <xsl:if test="not(./following::p[not(ancestor::*[matches(./@class, 'jrnl(.*?)Block')])])">
            <xsl:for-each select="//div[@class='body']//*[@class='jrnlBoxBlock'][not(.//*[@class='label'])][not(./following-sibling::*)][./*[@class='jrnlBoxCaption']//text()='Answers']">
                <xsl:if test="$journal='postgradmedj'">
                    <span class="jrnlFirstCitation">
                        <xsl:attribute name="data-rid">
                            <xsl:value-of select="replace(./@id,'BLK_','')"/>
                        </xsl:attribute>
                    </span>
                </xsl:if>
            </xsl:for-each>
            <xsl:for-each select="//div[@class='back']/div[@class='jrnlAppBlock'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./*[@class='jrnlBoxBlock']/@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each>
            </xsl:if>
        </xsl:element>
    </xsl:template>
    <!-- remove head for footnotes in stub column -->
    <xsl:template match="*[@class='front' or @class='back']//*[@class='jrnlSupplementFN' or @class='jrnlDeceasedFN' or @class='jrnlEqualContribFN' or @class='jrnlPresentationFN' or @class='jrnlPresentedFN' or @class='jrnlPrepubFN']/*[@class][matches(./@class, 'jrnl(.*?)Head')]" priority="5"/>
    
    <!-- footnotes without label -->
    <xsl:template match="*[@class='back']//p[@class='jrnlAckGroup']" priority="5">
        <xsl:element name="{name(.)}">
			<xsl:apply-templates select="@*"/>
			<span class="jrnlAckHead">Acknowledgements </span>
		    <xsl:apply-templates select="node() except(.//*[@class='jrnlAckHead'])"/>
		</xsl:element>
    </xsl:template>
    <xsl:template match="*[@class='back']//*[@class='jrnlPeerReviewFN' or @class='jrnlDataSharingFN' or @class='jrnlEthicsFN' or @class='jrnlConFN' or @class='jrnlCollabFN' or @class='jrnlPatientFN' or @class='jrnlAcknowledgementFN' or @class='jrnlDisclosureFN' or @class='jrnlFundGroup' or @class='jrnlConfFN'][not(.//*[@class][matches(./@class, 'jrnl(.*?)Head')])] | *[@class='back']//*[@class='jrnlPeerReviewFN' or @class='jrnlDataSharingFN' or @class='jrnlEthicsFN' or @class='jrnlConFN' or @class='jrnlCollabFN' or @class='jrnlPatientFN' or @class='jrnlDisclosureFN' or @class='jrnlFundGroup' or @class='jrnlConfFN'][.//*[@class][matches(./@class, 'jrnl(.*?)Head')]][./node()='']" priority="5">
    <xsl:variable name="class">
        <xsl:value-of select="./@class"/>
    </xsl:variable>
    <xsl:variable name="endPunc">
        <xsl:value-of select=".//*[@class][matches(./@class, 'jrnl(.*?)Head')]/@endPunc"/>
    </xsl:variable>
    <xsl:variable name="fnHeadclass">
        <xsl:choose>
            <xsl:when test="$class='jrnlPeerReviewFN'">jrnlPeerReviewHead</xsl:when>
            <xsl:when test="$class='jrnlDataSharingFN'">jrnlDataSharingHead</xsl:when>
            <xsl:when test="$class='jrnlEthicsFN'">jrnlEthicsHead</xsl:when>
            <xsl:when test="$class='jrnlConFN'">jrnlConHead</xsl:when>
            <xsl:when test="$class='jrnlConfFN'">jrnlConfHead</xsl:when>
            <xsl:when test="$class='jrnlCollabFN'">jrnlCollabHead</xsl:when>
            <xsl:when test="$class='jrnlDisclaimerFN'">jrnlDisclaimerHead</xsl:when>
            <xsl:when test="$class='jrnlPatientFN'">jrnlPatientHead</xsl:when>
            <xsl:when test="$class='jrnlAckGroup'">jrnlAckHead</xsl:when>
            <xsl:when test="$class='jrnlDisclosureFN'">jrnlDisclosureFNHead</xsl:when>
            <xsl:when test="$class='jrnlFundGroup'">jrnlFundHead</xsl:when>
        </xsl:choose>
    </xsl:variable>
          <p>
				<xsl:apply-templates select="@*"/>
                <xsl:choose>
                    <xsl:when test="$endPunc!=''">
                        <xsl:if test="./@data-label | .//@data-label[1]">
                            <span>
                                <xsl:attribute name="class">
                                    <xsl:value-of select="$fnHeadclass"/>
                                </xsl:attribute>
                                 <xsl:choose>
                                     <xsl:when test="./@data-label != ''">
                                        <xsl:value-of select="concat(./@data-label,$endPunc)"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                         <xsl:value-of select="concat(.//@data-label[1],$endPunc)"/>
                                    </xsl:otherwise>
                                 </xsl:choose>    
                            </span>
                        </xsl:if> 
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:if test="./@data-label | .//@data-label[1]">
                            <span>
                                <xsl:attribute name="class">
                                    <xsl:value-of select="$fnHeadclass"/>
                                </xsl:attribute>
                                <xsl:choose>
                                     <xsl:when test="./@data-label != ''">
                                        <xsl:value-of select="./@data-label"/>
                                        <xsl:text> </xsl:text>
                                    </xsl:when>
                                    <xsl:otherwise>
                                         <xsl:value-of select=".//@data-label[1]"/>
                                          <xsl:text> </xsl:text>
                                    </xsl:otherwise>
                                 </xsl:choose>
                            </span>
                        </xsl:if> 
                    </xsl:otherwise>
                </xsl:choose>
                <xsl:apply-templates select="node()except(.//*[@class][matches(./@class, 'jrnl(.*?)Head')])"/>
            </p>
    </xsl:template>
    <!--<xsl:template match="//td[contains(@*, data-cell-width-tablesetter)]" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*[not(contains(name(),'data-cell-width-tablesetter'))]"/>
            <xsl:attribute name="data-cell-width-tablesetter">
                <xsl:value-of select="sum(./@*[contains(name(),'data-cell-width-tablesetter')])"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>-->
    <xsl:template match="*[@class='jrnlAff']/*[@class='jrnlAffEmail']" priority="5">
        <xsl:variable name="itemNode" select="."/>
        <xsl:choose>
            <xsl:when test="$journalListForAffEmail/journal[@name=$journal]/articletype">
                <xsl:for-each select="$journalListForAffEmail/journal[@name=$journal]/articletype">
                    <xsl:if test="$articleType = translate(./text(), $uppercase, $smallcase)">
                        <xsl:element name="{$itemNode/name(.)}">
                            <xsl:apply-templates select="$itemNode/@* | $itemNode/node()"/>
                        </xsl:element>
                    </xsl:if>
                </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
				<!-- Do Nothing -->
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="*[@class='jrnlAff']/x[./following-sibling::*[@class='jrnlAffEmail']]" priority="5">
        <xsl:variable name="itemNode" select="."/>
        <xsl:choose>
            <xsl:when test="$journalListForAffEmail/journal[@name=$journal]/articletype">
                <xsl:for-each select="$journalListForAffEmail/journal[@name=$journal]/articletype">
                    <xsl:if test="$articleType = translate(./text(), $uppercase, $smallcase)">
                        <xsl:apply-templates select="$itemNode/node()"/>
                    </xsl:if>
                </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
				<!-- Do Nothing -->
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//x[@data-content-type='forceJustify']" priority="5">
    <span>
        <xsl:apply-templates select="./@*|./node()"/>
        </span>
    </xsl:template>
    <!-- jrnlFootNote-->
    <xsl:template match="//*[@class='jrnlFootNotePara'][./@data-label]" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
                <xsl:choose>
                    <xsl:when test="./@data-label = '*' or ./@data-label = '**'">
                        <span class="jrnlFootNoteHead">
                            <xsl:value-of select="./@data-label"/>
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <sup class="jrnlFootNoteHead">
                            <xsl:value-of select="./@data-label"/>
                        </sup>
                    </xsl:otherwise>
                </xsl:choose>
            <xsl:apply-templates select="./node()except(./label)"/>
        </span>
    </xsl:template>
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
	<!--<xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][1]|div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][last()]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <xsl:if test="count(./preceding-sibling::*[1][@class!='jrnlBoxBlock']) = 0">
                <xsl:for-each select="preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                    <span class="jrnlFirstCitation">
                        <xsl:attribute name="data-rid">
                            <xsl:value-of select="replace(./@id,'BLK_','')"/>
                        </xsl:attribute>
                    </span>
                </xsl:for-each>
            </xsl:if>
            <xsl:if test="count(./following-sibling::*[1][@class!='jrnlBoxBlock']) = 0">
                <xsl:for-each select="following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                 <xsl:variable name="fs" select="./following-sibling::*[1]/@class"/>
                    <xsl:if test="(matches($fs,'jrnlBoxBlock'))or not($fs)">
                    <span class="jrnlFirstCitation">
                        <xsl:attribute name="data-rid">
                            <xsl:value-of select="replace(./@id,'BLK_','')"/>
                        </xsl:attribute>
                    </span>
                    </xsl:if>
                </xsl:for-each>
            </xsl:if> 
    </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='body']//*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[1][@class='jrnlBoxBlock'][@data-uncited='true']]" priority="7">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <xsl:for-each select="following-sibling::*[1][@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each>
        </xsl:element>
    </xsl:template> -->
	<xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][./following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]|div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][./preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][count(preceding-sibling::*[not(matches(@class, 'jrnl(.*?)Block'))])=0]" priority="6">
        <xsl:variable name="current" select="generate-id(.)"/>
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <xsl:for-each select="following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <xsl:if test="$current = generate-id(./preceding-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1])">
                <xsl:choose>
                    <xsl:when test="./*[@class='jrnlBoxCaption']//text()='Answers' and $journal = 'postgradmedj'">
                    </xsl:when>
                    <xsl:otherwise>
                        <span class="jrnlFirstCitation">
                            <xsl:attribute name="data-rid">
                                <xsl:value-of select="replace(./@id,'BLK_','')"/>
                            </xsl:attribute>
                        </span>
                    </xsl:otherwise>
                </xsl:choose>
                </xsl:if>
            </xsl:for-each>
            <xsl:for-each select="preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <xsl:if test="$current = generate-id(./following-sibling::*[@class][not(matches(@class, 'jrnl(.*?)Block'))][1]) and count(preceding-sibling::*[not(matches(@class, 'jrnl(.*?)Block'))])=0">
                    <span class="jrnlFirstCitation">
                        <xsl:attribute name="data-rid">
                            <xsl:value-of select="replace(./@id,'BLK_','')"/>
                        </xsl:attribute>
                    </span>
                </xsl:if>
            </xsl:for-each> 
        </xsl:element>
    </xsl:template>
	<xsl:template match="//*[@type='main']/*[@class='doc'][./div[@class='front'][./div[@class='jrnlMetaInfo']]/div[@class='jrnlStubBlock']]/*[@class='back']/*[@class='jrnlCopyrightStmt'][@data-statement='new']" priority="5"/>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <!-- <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/> -->
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="@*[not(normalize-space())]"/>
   <!-- <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/> -->
   <xsl:template match="//p[@class='jrnlTblFoot']" priority="5"/>
    <!-- updated for image challenge for question answ removing back from main block and moving to sub-article-->
    <xsl:template match="//*[@class='sub-article']/*[@class='back']" priority="5">
        <xsl:choose>
            <xsl:when test="($articleType = 'image challenge' and $journal = 'heartasia') or ($articleType = 'challenges in trauma and acute care surgery' and $journal = 'tsaco')">
                <xsl:element name="{name(.)}">
                 <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="..//..//preceding-sibling::*[@type='main']//*[@class='doc']//*[@class='back']/*"/>
                    <xsl:apply-templates select="node()"/>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- updated for image challenge for question answ removing back from main block and moving to sub-article-->
    <xsl:template match="//*[@class='WordSection1']//*[@class='doc'][./*[@class='front'][@prefix='IECE' or @prefix='CSINTAADAECESY']]//*[@class='back']" priority="5">
         <xsl:choose>
                <xsl:when test="$journal = 'tsaco'">
                    <xsl:choose>
                        <xsl:when test="../../following::*[@class='sub-article']">
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:element name="{name(.)}">
                                <xsl:apply-templates select="@*|node()"/>
                            </xsl:element>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:when>
                <xsl:when test="$articleType = 'image challenge' and $journal = 'heartasia'"/>
                <xsl:otherwise>
                    <xsl:element name="{name(.)}">
                        <xsl:apply-templates select="@*"/>
                        <xsl:apply-templates select="node()"/>
                    </xsl:element>
                </xsl:otherwise>
         </xsl:choose>
    </xsl:template>
    <xsl:template match="div[@class='front']//*[@class='jrnlRRH' or @class='jrnlLRH' or @class='jrnlCRRH' or @class='jrnlCLRH']//*[@class='jrnlIssue']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./@startPunc">
                <xsl:value-of select="./@startPunc"/>
            </xsl:if>
            <xsl:value-of select="replace(.,'[a-z]+','')"/>
            <xsl:if test="@endPunc">
                <xsl:value-of select="./@endPunc"/>
            </xsl:if>
        </xsl:element>
    </xsl:template>   
    <xsl:template match="//h1|//h2[not(@class='jrnlAbsTitle')]" priority="5">
        <xsl:choose>
            <xsl:when test="starts-with(.,'Commentary') and $articleType = 'picket' and $journal = 'eap'"/>
            <xsl:otherwise>
                <xsl:element name="{name()}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:apply-templates select="node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- for picket article after commentary data removed from body and back -->
    <xsl:template match="//*[@class='WordSection1'][.//*[@class='doc']/*[@class='front'][@prefix='PICKET']]//*[@class='jrnlSecPara'][preceding-sibling::h1[1][starts-with(.,'Commentary')]]" priority="6">
        <xsl:choose>
            <xsl:when test="$articleType = 'picket' and $journal = 'eap'"/>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@class='WordSection1']//*[@class='doc'][./*[@class='front'][@prefix='PICKET']]//*[@class='back']" priority="8">
        <xsl:choose>
            <xsl:when test="$articleType = 'picket' and $journal = 'eap'"/>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<!-- Remove empty AppBlock -->
	<xsl:template match="//*[@class='back']//*[@class='jrnlAppBlock']" priority="6"/>
	<!-- Remove affgroup when correpaff and aff are same -->
	<xsl:template match="div[@class='front']//*[@class='jrnlAffGroup'][@retainAff]" priority="5">
        <xsl:choose>
            <xsl:when test="count(.//*[@class='jrnlAff']) = 1">
                <xsl:variable name="affNode">
                    <xsl:for-each select=".//*[@class='jrnlAff']">
        				<xsl:element name="{name(.)}">
        				    <xsl:apply-templates select="@*|node()except(*[@class='jrnlAffLabel'])"/>
        				</xsl:element>
        			</xsl:for-each>
    			</xsl:variable>
            	<xsl:variable name="corresAff">
            	    <xsl:value-of select="//*[@class='jrnlCorrAff']"/>
            	</xsl:variable>
            	<xsl:variable name="corresAff" select="replace($corresAff,',','')"/>
            	<xsl:variable name="AffData" select="replace($affNode,',', '')"/>
            	<xsl:variable name="AffData" select="replace($AffData,'^\s','')"/> 
            	<xsl:choose>
            	    <xsl:when test="contains($corresAff, $AffData)">
            	    </xsl:when>
            	    <xsl:otherwise>
            	        <xsl:element name="{name(.)}">
            	            <xsl:apply-templates select="@*"/>
        				    <xsl:apply-templates select="$affNode"/>
                    	</xsl:element>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<xsl:template match="//*[@class='jrnlDOI']" priority="6">
    <xsl:element name="{name(.)}">
        <xsl:apply-templates select="@*"/>
        <xsl:choose>
            <xsl:when test="not(contains(.,'10.1136'))">
                <xsl:if test="./@startPunc">
                    <xsl:value-of select="concat(./@startPunc,'10.1136/')"/>
                </xsl:if>
                <xsl:apply-templates select="node()"/>
             </xsl:when>
            <xsl:otherwise>
                <xsl:if test="./@startPunc">
                    <xsl:value-of select="./@startPunc"/>
                </xsl:if>
                <xsl:apply-templates select="node()"/>
                <xsl:if test="./@endPunc">
                    <xsl:value-of select="./@endPunc"/>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:element>
	</xsl:template>
	<!--updating the jrnlSocialFN-->
	<xsl:template match="//*[@class='back']/*[@class='jrnlSocialFN']" priority="5">
	    <xsl:choose> 
            <xsl:when test="../../*[@class='front']/p[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup']/*[@class='jrnlAuthorTwitterUrl']">
                <p class="jrnlSocialFN">
                     <xsl:apply-templates select="./*[@class='jrnlSocialHead']"/>
                     <span class="jrnlSocialPara">
                     
                     <xsl:for-each select="../../*[@class='front']/p[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthorTwitterUrl']]">
                      
                     <xsl:if test="./*[@class='jrnlAuthorTwitterUrl']!=''">
                         <xsl:variable name="nodeContents">
                              <xsl:value-of select="./*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                              <xsl:text> </xsl:text>
                              <xsl:value-of select="./*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                           </xsl:variable>
                            <xsl:variable name="urlNode" select="./*[@class='jrnlAuthorTwitterUrl']/text()"/>                       <xsl:variable name="urlData">
                            <xsl:choose> 
                                <xsl:when test="contains($urlNode,'https://twitter.com/')">
                                <xsl:value-of select="replace($urlNode, 'https://twitter.com/', '@')"/>
                                </xsl:when>
                                <xsl:when test="contains($urlNode,'@')">
                                    <xsl:value-of select="$urlNode"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat('@',$urlNode)"/>
                                </xsl:otherwise>
                            </xsl:choose>
                            </xsl:variable>
                            <xsl:variable name="FinalData">
                                <xsl:choose> 
                                <xsl:when test="position() = 1">
                                    <xsl:value-of select="concat('Follow ',$nodeContents)"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:choose> 
                                    <xsl:when test="position()=last()">
                                    <xsl:value-of select="concat(' and ',$nodeContents,' ')"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="concat(',',$nodeContents,' ')"/>
                                    </xsl:otherwise>
                                    </xsl:choose>
                                </xsl:otherwise>
                                 </xsl:choose>
                             </xsl:variable>
                          <xsl:apply-templates select="$FinalData"/>
                           <xsl:variable name="urlNodeHref">
                            <xsl:choose> 
                                <xsl:when test="contains($urlNode,'https://twitter.com/')">
                                <xsl:value-of select="$urlNode"/>
                                </xsl:when>
                                <xsl:when test="contains($urlNode,'@')">
                                <xsl:value-of select="replace($urlNode, '@', 'https://twitter.com/')"/>
                                </xsl:when>
                                <xsl:otherwise>
                                <xsl:value-of select="concat('https://twitter.com/',$urlNode)"/>
                                </xsl:otherwise>
                            </xsl:choose>
                            </xsl:variable>
                          <a href="{$urlNodeHref}">
                                <xsl:apply-templates select="$urlData"/>
                          </a>
                        </xsl:if>
                    </xsl:for-each>
                    </span>
                </p>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
            </xsl:choose>
	   </xsl:template>
	   <xsl:template match="//*[@class='front']//*[@class='jrnlAuthorTwitterUrl']" priority="5"/>
	<!-- To remove all authors in "to cite", "article author's group" and "Page footer" and retain collab statement when data-remove-pdfDisplay='allAuthors' attribute available in contrib-group -->
	<xsl:template match="//div[@class='front'][./*[@class='jrnlAuthors'][@data-remove-pdfDisplay='allAuthors']]/div[@class='jrnlStubBlock']/p[@class='jrnlStubToCite']/span[@class='jrnlAuthors']|//div[@class='front'][./*[@class='jrnlAuthors'][@data-remove-pdfDisplay='allAuthors']]/p[@class='jrnlRRH' or @class='jrnlLRH' or @class='jrnlCRRH' or @class='jrnlCLRH']//span[@class='jrnlAuthors']" priority="5">
        <xsl:if test="//div[@class='front']//span[@class='jrnlCollaboration']">
            <xsl:variable name="collab">
                <xsl:value-of select="replace(//div[@class='front']//span[@class='jrnlCollaboration'],'^for ','')"/>
            </xsl:variable>
            <xsl:element name="{name(.)}">
                <xsl:attribute name="class">
                    <xsl:value-of select="'jrnlAuthors'"/>
                </xsl:attribute>
                <span class="jrnlAuthorGroup">
                    <xsl:value-of select="$collab"/>
                </span>
            </xsl:element>
            <xsl:text>. </xsl:text>
        </xsl:if>
    </xsl:template>
	<xsl:template match="//div[@class='front'][./*[@class='jrnlAuthors'][@data-remove-pdfDisplay='allAuthors']]/p[@class='jrnlAuthors']" priority="5">
        <xsl:if test="//div[@class='front']//span[@class='jrnlCollaboration']">
            <xsl:variable name="collab">
                <xsl:value-of select="replace(//div[@class='front']//span[@class='jrnlCollaboration'],'^for ','')"/>
            </xsl:variable>
            <p class="jrnlAuthors">
                <span class="jrnlAuthorGroup">
                    <xsl:value-of select="$collab"/>
                </span>
            </p>
        </xsl:if>
    </xsl:template>
	<xsl:template match="//div[@class='front'][./*[@class='jrnlAuthors'][@data-remove-pdfDisplay='allAuthors']]//div[@class='jrnlAffGroup']" priority="6"/>
	
	<!-- Remove custom meta data query -->
	<xsl:template match="*[@class='front']/*[@class='jrnlCustomMetaGroup']" priority="5"/>
	<!-- Construct [AQ] for AuthorQuery -->
    <xsl:template match="//*[@class='jrnlQueryRef'][@data-citation-string]" priority="6">
        <!--<xsl:variable name="citationID" select="@data-citation-string"/>
        <xsl:variable name="citationID" select="replace($citationID, '^\s*(.+?)\s*$', '$1')"/> -->
        <span>
            <xsl:apply-templates select="@*"/>
           <!-- <xsl:value-of select="concat('[',$citationID,']')"/>-->
        </span>
    </xsl:template>

    <!--<xsl:choose>    
    <xsl:template match="//*[@class='back']" priority="8">
                <xsl:when test="@removeString != ''">
                    <xsl:variable name="nodeContent" select="."/>
                    <xsl:variable name="nodeContents">
                        <xsl:for-each select="tokenize(@removeString,',')">
                            <xsl:variable name="content" select="."/>
                            <xsl:variable name="nodeContent" select="replace($nodeContent, $content, '')"/>
                        </xsl:for-each>
                        <xsl:value-of select="$nodeContent"/>
                    </xsl:variable>
                    <xsl:value-of select="$nodeContents"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>-->
</xsl:stylesheet>