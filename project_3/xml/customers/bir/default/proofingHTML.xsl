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
   <!-- <xsl:template match="p[@class='jrnlSecPara'][not(./child::img[@class='jrnlDisplayImage'])]|p[@class='jrnlTblCaption']" priority="5">
        <xsl:choose>
            <xsl:when test="node()!=''">
                <p>
                    <xsl:apply-templates select="@*|node()"/>
                </p>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> -->
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
            <!--<xsl:choose>
                 <xsl:when test=".//*[@class='jrnlAbsTitle']">
                    <xsl:for-each select="//*[@class='jrnlAbsTitle']">
                         <xsl:variable name="current" select="."/>
                         <p class="jrnlAbsPara">
                         <xsl:apply-templates select="./following-sibling::*[@class='jrnlAbsPara'][1]/@*[name()!='class']"/>
                            <xsl:apply-templates select="."/>
                            <xsl:for-each select="./following-sibling::*[@class='jrnlAbsPara']">
                                <xsl:choose>
                                    <xsl:when test="./preceding-sibling::*[@class='jrnlAbsTitle'][1] = $current">
                                        <span>
                                            <xsl:apply-templates select="@*|node()"/>
                                        </span>
                                    </xsl:when>
                                </xsl:choose>
                            </xsl:for-each>
                        </p>
                     </xsl:for-each>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates/>
                </xsl:otherwise>
            </xsl:choose> -->
			<xsl:apply-templates/>
        </div>
    </xsl:template>
	<xsl:template match="//div[@class='front']//p[@class='jrnlAbsPara']" priority="5">
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                <span>
                    <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*"/>
                    <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
                    <xsl:choose>
                        <xsl:when test="$journal = 'dmfr'">
                            <xsl:text> </xsl:text>
                        </xsl:when>
                        <xsl:when test="$journal = 'bjr' or $journal='bjro'">
                            <xsl:text> </xsl:text>
                        </xsl:when>
                    </xsl:choose>
                </span> 
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </p>
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
             <xsl:when test="$journal = 'bjr' or $journal='bjrcr' or $journal='bjro'">
                <h1 class="jrnlAbsHead">
                    <xsl:apply-templates/>
                </h1>
                </xsl:when>
                </xsl:choose>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5"/>
    <!--<xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5">
        <xsl:if test="node()!=''">
            <span>
                <xsl:apply-templates select="@*|node()"/>
                <xsl:choose>
                    <xsl:when test="$journal = 'dmfr'">
                        <xsl:text> </xsl:text>
                    </xsl:when>
                    <xsl:when test="$journal = 'bjr'">
                        <xsl:text> </xsl:text>
                    </xsl:when>
                </xsl:choose>
            </span>
        </xsl:if>
    </xsl:template> -->
   <!-- <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates select="node()"/>
        </span>
    </xsl:template> -->
    <!--<xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>-->
    <xsl:template match="//div[@class='body']//h3[@data-runon='true']" priority="5">
        <h3 class="jrnlHead3">
            <span>
                <xsl:apply-templates select="@*|node()"/>
            </span>
            <xsl:text>: </xsl:text>
            <span>
                <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlSecPara']/@*|./following-sibling::*[1][@class='jrnlSecPara']/node()"/>
            </span>
        </h3>
    </xsl:template>
    <xsl:template match="//div[@class='body']//p[./preceding-sibling::*[1][@data-runon='true']]" priority="6"/>
	<xsl:template match="//div[@class='jrnlAppBlock']//h3" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'dmfr'">
                <h3 class="jrnlAppHead3">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                    </span>
                    <xsl:text>: </xsl:text>
                    <span>
                        <xsl:apply-templates select="./following-sibling::*[1][@class='jrnlSecPara']/@*|./following-sibling::*[1][@class='jrnlSecPara']/node()|./following-sibling::*[1][@class='jrnlPara']/@*|./following-sibling::*[1][@class='jrnlPara']/node()"/>
                    </span>
                </h3>
            </xsl:when>
            <xsl:when test="$journal = 'bjr' or $journal = 'bjro'">
                <h3 class="jrnlAppHead3">
                    <xsl:apply-templates select="@*|node()"/>
                </h3>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
      <xsl:template match="//div[@class='jrnlAppBlock']//p[@class='jrnlPara'][./preceding-sibling::*[1][@class='jrnlAppHead3']]" priority="6">
        <xsl:choose>
            <xsl:when test="$journal = 'dmfr'"/>
            <xsl:when test="$journal = 'bjr' or $journal = 'bjro'">
                <p>
                    <xsl:apply-templates select="@*|node()"/>
                </p>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
	<!-- Moved this firstcitation template match to structure.xsl -->
    <!--<xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
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
<!--    <xsl:template match="//span[@class='jrnlSupplRef']" priority="5">
        <xsl:variable name="doi" select="//div[@class='front']//*[@class='jrnlDOI']"/>
        <xsl:variable name="fileName" select="./@data-citation-string"/>
        <xsl:choose>
            <xsl:when test="$fileName[contains(., 'ST')]">
                <xsl:variable name="href" select="concat('www.birpublications.org/doi/suppl/',$doi,'/suppl_file_/','Supplementary_table.docx')"/>
                <a href="{$href}">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                    </span>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="href" select="concat('www.birpublications.org/doi/suppl/',$doi,'/suppl_file_/','Supplementary_figure.docx')"/>
                <a href="{$href}">
                    <span>
                        <xsl:apply-templates select="@*|node()"/>
                    </span>
                </a>
            </xsl:otherwise>
        </xsl:choose>
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
                                <xsl:when test="not(starts-with(.//*[@class='RefDOI']/text(), 'https://doi.org'))">https://doi.org/<xsl:value-of select=".//*[@class='RefDOI']"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select=".//*[@class='RefDOI']"/>
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
                                <xsl:when test="not(starts-with(./@data-doi, 'https://doi.org'))">https://doi.org/<xsl:value-of select="./@data-doi"/>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="./@data-doi"/>
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
            <xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)] and position()=2">
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
    </xsl:template>
    <xsl:template match="//div[@class='jrnlCorrAffGroup'][1]" priority="5">
     <div>
            <xsl:apply-templates select="@*"/>
        <!--<p>
            <xsl:apply-templates select="@*"/>
            <span class="jrnlCorrAffHead">
                <xsl:apply-templates select="./../../p[@class='jrnlCorrAffHead']/node()"/>
            </span>
            <xsl:apply-templates select="node()"/>
        </p> -->
        <xsl:choose>
                <xsl:when test="./following-sibling::div[@class='jrnlCorrAffGroup']">
                    <p class="jrnlCorrAffHead">
                        <xsl:apply-templates select="./../*[@class='jrnlCorrAffHead']/node()"/>
                    </p>
                    <xsl:apply-templates select="node()"/>
                </xsl:when>
                <xsl:otherwise>
                    <p class="jrnlCorrAffHead">
                        <xsl:apply-templates select="@*[name()!='class']"/>
                        <span class="jrnlCorrAffHead">
                            <xsl:apply-templates select="./../*[@class='jrnlCorrAffHead']/node()"/>
                        </span>
                        <span>
                            <xsl:apply-templates select="./p[@class='jrnlCorrAff']/@*"/>
                            <xsl:apply-templates select="./p[@class='jrnlCorrAff']/node()"/>
                        </span>
                    </p>
                    <xsl:apply-templates select="./node()except(*[@class='jrnlCorrAff'])"/>
                </xsl:otherwise>
            </xsl:choose>
            </div>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlCorrEmail']" priority="5">
        <xsl:text>E-mail: </xsl:text>
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <a href="mailto:{node()}">
                <xsl:apply-templates select="node()"/>
            </a>
        </xsl:element>
    </xsl:template>
  <!--  <xsl:template match="//p[@class='jrnlCorrAffHead']" priority="5">
        <xsl:if test="not(//*[@class='jrnlAffGroup'])">
            <p class="jrnlCorrAffHeadNoAff">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
        <xsl:if test="//*[@class='jrnlAffGroup']">
            <p class="jrnlCorrAffHead">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
    </xsl:template> -->
	<!-- to remove comment and meta inside body -->
	 <xsl:template match="//div[@class='body']//meta" priority="5"/>
     <xsl:template match="comment()" priority="5"/>
    <xsl:template match="//*[@class='jrnlCorrAffHead']" priority="5">
        <xsl:choose>
            <xsl:when test="not(//div[@class='front']//*[@class='jrnlCorrAffGroup'])">
                <xsl:element name="{./name()}">
                    <xsl:apply-templates/>
                </xsl:element>
            </xsl:when>
            <xsl:when test="//div[@class='front']//*[@class='jrnlCorrAffGroup']"/><!-- Do Nothing -->
            <xsl:otherwise><!-- Do Nothing --></xsl:otherwise>
        </xsl:choose>
    </xsl:template>
	<!-- <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="concat(.,' ')"/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
        </span>
    </xsl:template> -->
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'dmfr'">
                <xsl:variable name="labelName">
                    <xsl:choose>
                        <xsl:when test="contains(.,'.')">
                            <xsl:value-of select="concat(substring-before(.,'.'),' ')"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="concat(.,' ')"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                <span class="label">
                    <xsl:value-of select="$labelName"/>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span class="label">
                    <xsl:apply-templates/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="*[@class='jrnlFigBlock']" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
            <xsl:if test="$journal = 'bjr' or $journal ='bjro'">
                <xsl:apply-templates select="./*[@class='jrnlFigCaption']"/>
            </xsl:if>
            <xsl:if test="$journal = 'bjrcr'">
                <xsl:apply-templates select="./*[@class='jrnlFigCaption']"/>
            </xsl:if>
            <xsl:element name="img">
                <xsl:if test="./@class">
                    <xsl:attribute name="class">
                        <xsl:value-of select="./img/@class"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:if test="./img/@id">
                    <xsl:attribute name="id">
                        <xsl:value-of select="./img/@id"/>
                    </xsl:attribute>
                </xsl:if>
                <xsl:attribute name="src">
                    <xsl:value-of select="./img/@src"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                    <xsl:value-of select="./img/@alt"/>
                </xsl:attribute>
                <xsl:apply-templates select="./img/@*[contains(name(.), 'data-')]"/>
            </xsl:element>
            <xsl:choose>
                <xsl:when test="$journal = 'bjr' or $journal ='bjro'">
                    <xsl:apply-templates select="./*[@class != 'jrnlFigCaption']"/>
                </xsl:when>
                <xsl:when test="$journal = 'bjrcr'">
                    <xsl:apply-templates select="./*[@class != 'jrnlFigCaption']"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select=" node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </div>
    </xsl:template>
    <xsl:template match="*[@class='jrnlVidBlock']" priority="5">
        <div>
            <xsl:apply-templates select=" @* "/>
            <xsl:apply-templates select="./img"/>
            <xsl:apply-templates select="./*[@class='jrnlVidCaption']"/>
        </div>
    </xsl:template>
    <xsl:template match="//*[@type='main']//*[@class='jrnlBoxBlock']|//*[@class='back']//*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']" priority="5">
        <div>
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
                    <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream' and name()!='data-type'] "/>
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
                    <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream' and name()!='data-type'] "/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]|.//*[@class!='label']">
                        <xsl:attribute name="data-type">
                            <xsl:value-of select="$type"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select=" @*[name()!='data-type']"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates select=" node() "/>
        </div>
    </xsl:template>
    <xsl:template match="div[@type='main'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][1]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <!--<xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">-->
            <xsl:for-each select="preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each>
            <!--    </xsl:when>
                <xsl:otherwise/>
            </xsl:choose>-->
        </xsl:element>
    </xsl:template>
    <xsl:template match="div[@type='main'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][last()]" priority="6">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
            <!--<xsl:choose>
                <xsl:when test="$journalList[contains(., $journal)]">-->
            <xsl:for-each select="following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each>
                <!--</xsl:when>
                <xsl:otherwise/>
            </xsl:choose>-->
        </xsl:element>
    </xsl:template>
    <!--<xsl:template match="//*[@class='jrnlFundingGroup']" priority="5">
        <div class="jrnlFundingGroup">
            <h1 class="jrnlFundingHead" contenteditable="false">Funding</h1>
            <p class="jrnlFundingStatement">
                <xsl:apply-templates select=".//*[@class='jrnlFundingStatement']/td/node()"/>
            </p>
        </div>
    </xsl:template>-->
    <!--<xsl:template match="//div[@class='jrnlFundingGroup']" priority="5">
        <xsl:choose>
            <xsl:when test=".//*[@class='jrnlFundingStatement']/node()">
                <div class="jrnlFundingGroup">
                    <h1 class="jrnlFundingHead" contenteditable="false">Funding</h1>
                    <p class="jrnlFundingStatement">
                        <xsl:apply-templates select=".//*[@class='jrnlFundingStatement']/node()"/>
                    </p>
                </div>
            </xsl:when>
            <xsl:otherwise/>
        </xsl:choose>
    </xsl:template> -->
	<xsl:template match="//*[@class='jrnlFundingGroup']" priority="5">
        <xsl:choose>
            <xsl:when test=".//*[@class='jrnlFundingStatement']/node()">
                <xsl:element name="{name(.)}">
                    <xsl:attribute name="class">
                        <xsl:value-of select="'jrnlFundingGroup'"/>
                    </xsl:attribute>
                    <h1 class="jrnlFundingHead" contenteditable="false">Funding</h1>
                    <p class="jrnlFundingStatement">
                        <xsl:apply-templates select=".//*[@class='jrnlFundingStatement']/node()"/>
                    </p>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise/>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="//*[@class='jrnlConfFN']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'dmfr'">
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*"/>
                  <!--  <h1 class="jrnlConfHead">
                        <xsl:apply-templates select=".//*[@class='jrnlConfHead']/node()"/>
                    </h1> -->
                    <h1 class="jrnlConfHead">
                    <xsl:choose>
                        <xsl:when test=".//*[@class='jrnlConfHead']/node()">
                            <xsl:apply-templates select=".//*[@class='jrnlConfHead']/node()"/>
                        </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="./@data-label"/>
                    </xsl:otherwise>
                    </xsl:choose>
                    </h1>
                    <xsl:for-each select=".//*[@class='jrnlConfPara']">
                        <p class="jrnlConfPara">
                            <xsl:apply-templates select="./node()"/>
                        </p>
                    </xsl:for-each>
                </xsl:element>
            </xsl:when>
            <!--<xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*|node()"/>
                </xsl:element>
            </xsl:otherwise> -->
            <xsl:otherwise>
                <xsl:element name="{name(.)}">
                    <xsl:apply-templates select="@*"/>
                    <xsl:choose>
                        <xsl:when test="//*[@class='jrnlConfHead']">
                        <p class="jrnlConfHead">
                            <xsl:apply-templates select="//*[@class='jrnlConfHead']/node()"/>
                            </p>
                        </xsl:when>
                        <xsl:otherwise>
                         <p class="jrnlConfHead">
                            <xsl:value-of select="./@data-label"/>
                        </p>    
                    </xsl:otherwise>
                    </xsl:choose>
                      <xsl:apply-templates select="node()except(//*[@class='jrnlConfHead'])"/>
                </xsl:element>
            </xsl:otherwise>
        </xsl:choose>
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
    <xsl:template match="//*[@class='jrnlLicense']/*[@class='jrnlLicensePara']" priority="5">
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
    </xsl:template>
	<xsl:template match="//*[@class='jrnlLicensePara']/span[@data-class='xmlOnly']" priority="5"/>
	<xsl:template match="//span[@class='jrnlSupplRef']" priority="5">
        <xsl:variable name="doi" select="//div[@class='front']//*[@class='jrnlDOI']"/>
        <xsl:variable name="id" select="./@data-citation-string"/>
        <xsl:variable name="citationid" select="replace($id, '^\s+|\s+$', '')"/>
        <xsl:element name="{name(.)}">
        	<xsl:apply-templates select="@*"/>
            <xsl:choose>
                <xsl:when test=".//*[@class='jrnlExtLink']|.//a[@href]">
                    <xsl:apply-templates select="node()"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:variable name="suppMediaValue" select="//*[@class='jrnlSupplBlock'][replace(@id,'BLK_','')=$citationid]//*[@class='jrnlSupplMedia']/node()"/>
                    <xsl:if test="$suppMediaValue!=''">
                        <xsl:variable name="suppMediaValue" select="replace($suppMediaValue, '\s', '')"/>
                        <xsl:variable name="href" select="concat('www.birpublications.org/doi/suppl/',$doi,'/suppl_file/',$suppMediaValue)"/>
                        <a href="{$href}">
                            <xsl:apply-templates select="node()"/>
                        </a>
                    </xsl:if>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlSupplBlock']" priority="6"/>
    <!--<xsl:template match="//td[contains(@*, data-cell-width-tablesetter)]" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*[not(contains(name(),'data-cell-width-tablesetter'))]"/>
            <xsl:attribute name="data-cell-width-tablesetter">
                <xsl:value-of select="sum(./@*[contains(name(),'data-cell-width-tablesetter')])"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template>-->
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="*[@class='jrnlRefText']//*[@class='RefDOI']|*[@class='jrnlAppRefText']//*[@class='RefDOI']" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <!--<xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/> -->
	<xsl:template match="//p[@class='jrnlTblFoot'][./preceding-sibling::table[1]]" priority="5"/>
    <!--<xsl:template match="@*[not(normalize-space())]"/>-->
</xsl:stylesheet>