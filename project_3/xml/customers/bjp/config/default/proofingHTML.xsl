<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="watermark"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
    <xsl:param name="cmsID"/>
    <xsl:param name="doi"/>
    <xsl:param name="fpage"/>
    <xsl:param name="article">
        <emj>
            <type>Primary survey</type>
        </emj>
    </xsl:param>
    <xsl:variable name="journalList" as="element()*">
        <item>ebm</item>
        <item>ebn</item>
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
                    <xsl:when test="@class='jrnlOnBehalfOf'">
                        <xsl:text> </xsl:text>
                        <!--<xsl:choose>
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
                <xsl:when test="@class='jrnlAuthor'">
                    <xsl:choose>
                        <xsl:when test="../position() eq count(../*[@class='jrnlAuthorGroup'])-1">
                            <xsl:value-of select="./@penultimatePunc"/>
                        </xsl:when>
                        <xsl:when test="../following-sibling::*[@class='jrnlAuthorGroup']">
                            <xsl:value-of select="./@interPunc"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test="../following-sibling::*[@class='jrnlOnBehalfOf']">
                                <xsl:value-of select="../following-sibling::*[@class='jrnlOnBehalfOf'][1]/@startPunc"/>
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
    <xsl:template match="p[@class='jrnlSecPara']|p[@class='jrnlAbsPara']|p[@class='jrnlTblCaption']" priority="5">
        <xsl:choose>
            <xsl:when test="node()!=''">
                <p>
                    <xsl:apply-templates select="@*|node()"/>
                </p>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!--<xsl:template match="//div[@class='front']//div[@class='jrnlAbsGroup']" priority="5">
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
    </xsl:template> -->
	<xsl:template match="//div[@class='front']//div[@class='jrnlAbsGroup']" priority="5">
        <xsl:if test="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
            <xsl:for-each select="//*[@class='jrnlAbsPara']//*[@class='jrnlAbsBox']">
                <div class="jrnlAbsBox">
                    <xsl:apply-templates select="./@*|./*"/>
                </div>
            </xsl:for-each>
        </xsl:if>
        <div class="jrnlAbsGroup">
             <xsl:apply-templates select="@*|node()"/>
        </div>
    </xsl:template>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']" priority="5">
        <p class="jrnlAbsPara">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='front']//*[@class='jrnlAbsHead']" priority="5">
        <xsl:variable name="nextNode" select="following-sibling::*/@class"/>
        <xsl:choose>
            <xsl:when test="$nextNode[contains(.,'jrnlAbsTitle')]"/>
            <xsl:otherwise>
            <xsl:choose>
             <xsl:when test="$journal = 'bjr' or $journal='bjrcr'">
                <h1 class="jrnlAbsHead">
                    <xsl:apply-templates/>
                </h1>
                </xsl:when>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//div[@class='body']//h2[@data-runon='true']" priority="5">
        <h2 class="jrnlHead2">
            <span>
                <xsl:apply-templates select="@*|node()"/>
            </span>
            <xsl:text>. </xsl:text>
            <span>
                <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlSecPara']/@*|./following-sibling::*[1][@class='jrnlSecPara']/node()"/>
            </span>
        </h2>
    </xsl:template>
    <xsl:template match="//div[@class='body']//p[@class='jrnlSecPara'][not(./preceding-sibling::*[1][@class='jrnlHead2'])][./preceding-sibling::*[2][@data-runon='true']]" priority="8"> 
        <p>
            <xsl:attribute name="data-spl-style">
                    <xsl:value-of select="'TXI'"/>
                </xsl:attribute>
            <xsl:apply-templates select="@*|node()"/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@data-runon='true']]" priority="6"/>
<!-- Moved this firstcitation template match to structure.xsl -->
    <!--
	<xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
        <xsl:if test="./@data-anchor = 'true'">
            <span class="jrnlFirstCitation" data-rid="{./@data-citation-string}"/>
        </xsl:if>
        <span class="{./@class}" data-citation-string="{./@data-citation-string}">
            <xsl:variable name="id" select="./@data-citation-string"/>
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
           <!-- <xsl:if test="../../p[@class='jrnlTblFoot']">
                <tr>
                    <td colspan="{$maxCells}">
                        <xsl:for-each select="../../p[@class='jrnlTblFoot']">
                            <p class="jrnlTblFoot">
                                <xsl:apply-templates select="@*|node()"/>
                            </p>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:if> -->
            <xsl:if test="../following-sibling::*[1][@class='jrnlTblFoot']">
                <tr>
                    <td colspan="{$maxCells}">
                        <xsl:for-each select="../following-sibling::p[@class='jrnlTblFoot']">
                            <p class="jrnlTblFoot">
                                <xsl:apply-templates select="@*|node()"/>
                            </p>
                        </xsl:for-each>
                    </td>
                </tr>
            </xsl:if>
        </tbody>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlCorrEmail']" priority="5">
       <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:text>email: </xsl:text>
            <xsl:apply-templates select="node()"/>
       </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefJournalTitle']|//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefBookTitle']" priority="5">
        <xsl:variable name="class" select="./@class"/>
        <xsl:variable name="doi" select="replace(./../span[@class='RefWebsite'],'doi:','')"/>
        <xsl:variable name="doi" select="replace($doi,' ','%20')"/>
        <xsl:variable name="doi">
            <xsl:choose>
                <xsl:when test="not(starts-with($doi, 'http://dx.doi.org'))">http://dx.doi.org/<xsl:value-of select="$doi"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$doi"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:variable>
        <span class="{$class}">
            <xsl:choose>
                <xsl:when test="./../span[@class='RefWebsite']">
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
    <xsl:template match="//p[@class='jrnlRefText']|//p[@class='jrnlAppRefText']" priority="5">
        <p class="{./@class}">
            <xsl:apply-templates select="@*|node()"/>
            <xsl:choose>
                <xsl:when test=".//*[@class='RefDOI']">
                    <xsl:text> doi: </xsl:text>
                    <span class="RefDOI">
                        <a href="https://doi.org/{.//*[@class='RefDOI']/text()}">
                        <!--    <xsl:value-of select=".//*[@class='RefDOI']"/> -->
                            <xsl:choose>
                                <xsl:when test="not(starts-with(.//*[@class='RefDOI']/text(), 'https://doi.org'))">
                                    <xsl:value-of select=".//*[@class='RefDOI']"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="replace(.//*[@class='RefDOI'],'https://doi.org/','')"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </a>
                    </span>
                </xsl:when>
                <xsl:when test="./@data-doi">
                    <xsl:text>. doi: </xsl:text>
                    <span class="RefDOI">
                        <a href="https://doi.org/{./@data-doi}">
                            <!--<xsl:value-of select="./@data-doi"/>-->
                            <xsl:choose>
                                <xsl:when test="not(starts-with(./@data-doi, 'https://doi.org'))">
                                    <xsl:value-of select="./@data-doi"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="replace(.//*[@class='RefDOI'],'https://doi.org/','')"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </a>
                    </span>
                </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/span[@class='RefWebsite']" priority="5">
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
    <xsl:template match="//div[@class='back']/p[@class='jrnlRefText']/*[@class='RefAuthor'][1]|//div[@class='back']/p[@class='jrnlRefText']/*[@class='RefCollaboration'][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
                <span class="RefFirstAuthor">
                    <xsl:value-of select="."/>
                </span>
        </xsl:element>
    </xsl:template>
      
	<!-- to remove comment and meta inside body -->
	 <xsl:template match="//div[@class='body']//meta" priority="5"/>
     <xsl:template match="comment()" priority="5"/>
  	<!--<xsl:template match="//*[@class='jrnlFigCaption']" priority="5">
	    <xsl:if test=".//*[@class='label'][.!='']">
	        <p>
	            <xsl:apply-templates select=".//*[@class='label']/@*"/>
	            <xsl:apply-templates select=".//*[@class='label']/node()"/>
	        </p>
    	</xsl:if>
	    <p>
	        <xsl:apply-templates select="@*|node()except(//*[@class='label'])"/>
	    </p>
	</xsl:template> -->
	<xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="concat(.,' ')"/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
        </span>
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
    
     <xsl:template match="//div[@class='jrnlPeerReviewFN' or @class='jrnlDataSharingFN' or @class='jrnlEthicsFN' or @class='jrnlConFN' or @class='jrnlCollabFN' or @class='jrnlPatientFN' or @class='jrnlAcknowledgementFN' or @class='jrnlDisclosureFN'][not(.//*[@class][matches(./@class, 'jrnl(.*?)Head')])]" priority="5">
     <xsl:variable name="class">
            <xsl:value-of select="./@class"/>
        </xsl:variable>
    <xsl:variable name="fnHeadclass">
	<xsl:choose>
		<xsl:when test="$class='jrnlPeerReviewFN'">,jrnlPeerReviewHead</xsl:when>
		<xsl:when test="$class='jrnlDataSharingFN'">jrnlDataSharingHead</xsl:when>
		<xsl:when test="$class='jrnlEthicsFN'">jrnlEthicsFNHead</xsl:when>
		<xsl:when test="$class='jrnlConFN'">,jrnlConHead</xsl:when>
		<xsl:when test="$class='jrnlCollabFN'">jrnlCollabHead</xsl:when>
		<xsl:when test="$class='jrnlDisclaimerFN'">jrnlDisclaimerHead</xsl:when>
		<xsl:when test="$class='jrnlPatientFN'">jrnlPatientHead</xsl:when>
		<xsl:when test="$class='jrnlAcknowledgementFN'">jrnlAckHead</xsl:when>
		<xsl:when test="$class='jrnlDisclosureFN'">jrnlDisclosureFNHead</xsl:when>
	</xsl:choose>
</xsl:variable>
    <div>
        <xsl:apply-templates select="@*"/>
        <xsl:if test="./@data-label">
            <p>
                <xsl:attribute name="class">
                    <xsl:value-of select="$fnHeadclass"/>
                </xsl:attribute>
                <xsl:value-of select="./@data-label"/>
            </p>
        </xsl:if> 
         <xsl:apply-templates select="node()"/>
    </div>
    </xsl:template>
    <!--<xsl:template match="//*[@class='jrnlLicense']/*[@class='jrnlLicensePara']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:for-each select="./node()">
                <xsl:choose>
                    <xsl:when test="self::*">
                        <xsl:apply-templates select="."/>
                    </xsl:when>
                    <xsl:when test="self::text()">
                        <xsl:value-of select="replace(.,'This is an Open Access article distributed','')"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:for-each>
        </xsl:element>
    </xsl:template> -->
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
	<xsl:template match="div[@class='front']//div[@class='jrnlMetaInfo']//p[@class='jrnlAuthorAff']/p[@class='jrnlAff']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>
	<xsl:template match="*[@class='back']//div[@class='jrnlAckGroup']" priority="5">
        <xsl:element name="{name(.)}">
			<xsl:apply-templates select="@*"/>
			<h1 class="jrnlAckHead">Acknowledgements</h1>
		    <xsl:apply-templates select="node() except(.//*[@class='jrnlAckHead'])"/>
		</xsl:element>
    </xsl:template>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlRefText']//*[@class='RefDOI']|*[@class='jrnlAppRefText']//*[@class='RefDOI']" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <!--<xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/> -->
	<xsl:template match="//p[@class='jrnlTblFoot'][./preceding-sibling::table[1]]" priority="5"/>
    <!--<xsl:template match="@*[not(normalize-space())]"/>-->
    
    
    	<xsl:template match="//*[@class='back']/*[@class='jrnlSocialFN']" priority="5">
        <xsl:choose> 
            <xsl:when test="../../*[@class='front']/*[@class='jrnlStubBlock']/*[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup']/*[@class='jrnlAuthorTwitterUrl']">
                <p class="jrnlSocialFN">
                     <xsl:apply-templates select="./*[@class='jrnlSocialHead']"/>
                     <span class="jrnlSocialPara">
                     <xsl:for-each select="../../*[@class='front']/*[@class='jrnlStubBlock']/*[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup'][./*[@class='jrnlAuthorTwitterUrl']]">
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
                                    <xsl:value-of select="concat('Follow ',$nodeContents,' ')"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat($nodeContents,' ')"/>
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
                          <xsl:if test="position()!=last()">
                           <br/>
                          </xsl:if>
                        </xsl:if>
                </xsl:for-each>
                </span>
                </p>
            </xsl:when>
            <xsl:otherwise/>
            </xsl:choose>
	   </xsl:template>
	   	<xsl:template match="//*[@class='front']/*[@class='jrnlStubBlock']/*[@class='jrnlAuthors']/*[@class='jrnlAuthorGroup']/*[@class='jrnlAuthorTwitterUrl']" priority="5"/>
</xsl:stylesheet>