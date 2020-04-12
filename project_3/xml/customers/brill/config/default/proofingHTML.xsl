<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xlink="http://www.w3.org/1999/xlink" version="2.0" exclude-result-prefixes="xsi xs xlink mml">
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
    <xsl:variable name="smallcase" select="'abcdefghijklmnopqrstuvwxyz'"/>
    <xsl:variable name="allcase" select="concat($smallcase, $uppercase)"/>
    <xsl:param name="proof"/>
    <xsl:param name="watermark"/>
    <xsl:param name="articleType"/>
    <xsl:param name="journal"/>
    <xsl:param name="cmsID"/>
    <xsl:param name="fpage"/>
    <xsl:param name="doi"/>
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
   <!-- <xsl:template match="*[contains(@*, Punc)]|*[contains(@*, removeString)]"> -->
   <xsl:template match="*[@*[contains(., 'Punc')]]|*[@*[contains(., removeString)]]">
        <xsl:variable name="class" select="./@class"/>
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./@startPunc">
                <xsl:choose>
                    <xsl:when test="@class='jrnlOnBehalfOf'">
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
                <xsl:when test="@class='jrnlAuthor' or @class='jrnlOnBehalfOf'">
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
    <xsl:template match="//div[@class='front']" priority="5">
        <div class="front" cmsID="{$cmsID}" doi="{$doi}" journal-id="{$journal}" fpage="{$fpage}" proof-type="{$proof}" watermark="{$watermark}">
            <xsl:apply-templates select="@*|node()"/>
        </div>
    </xsl:template>
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
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']" priority="5">
        <p class="jrnlAbsPara">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template>
    <xsl:template match="//div[@class='jrnlRelatedInfo']" priority="6">
        <xsl:choose>
            <xsl:when test=".//@data-p-display">
                <xsl:variable name="data-p-display" select=".//@data-p-display"/>
                <xsl:choose>
                    <xsl:when test="$proof='print' and $data-p-display='print'">
                        <div class="jrnlRelatedInfo">
                            <xsl:apply-templates/>
                        </div>
                    </xsl:when>
                    <xsl:when test="$proof='online' and $data-p-display='online'">
                        <div class="jrnlRelatedInfo">
                            <xsl:apply-templates select="@*|node()"/>
                        </div>
                    </xsl:when>
                </xsl:choose>
            </xsl:when>
            <xsl:when test="not(.//@data-p-display)">
                <div class="jrnlRelatedInfo">
                    <xsl:apply-templates select="@*|node()"/>
                </div>
            </xsl:when>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//img[@class='REL_IMAGE']|//img[not(@class) and not(@id) and not(@alt)]" priority="5">
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
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates select="node()"/>
        </span>
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
    <xsl:template match="//span[@class='jrnlSupplRef']" priority="5">
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
    </xsl:template>
    <xsl:template match="//p[@class='jrnlCorrAffHead']" priority="5">
        <xsl:choose>
            <xsl:when test="$journal = 'ebmh' and $articleType = 'commentary' and count(//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']) = 1"/>
            <xsl:when test="not(//*[@class='jrnlAffGroup'])">
                <p class="jrnlCorrAffHeadNoAff">
                    <xsl:apply-templates/>
                </p>
            </xsl:when>
            <xsl:when test="//*[@class='jrnlAffGroup']">
                <p class="jrnlCorrAffHead">
                    <xsl:value-of select="./@startPunc"/>
                    <xsl:apply-templates/>
                    <xsl:value-of select="./@endPunc"/>
                </p>
            </xsl:when>
        </xsl:choose>
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
    <xsl:template match="//*[@type='main']//*[@class='jrnlBoxBlock']|//*[@class='back']/*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']" priority="5">
        <div>
            <xsl:choose>
                <xsl:when test="count(preceding-sibling::*[@class!='jrnlBoxBlock']) = 0">
                    <xsl:choose>
                        <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                            <xsl:attribute name="data-type">
                                <xsl:value-of select="'TYPE1'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:variable name="seq" select="count(preceding-sibling::*)"/>
                            <xsl:attribute name="data-type">
                                <xsl:value-of select="'KEY'"/>
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
                    <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                </xsl:when>
                <xsl:when test="count(following-sibling::*[@class!='jrnlBoxBlock']) = 0">
                    <xsl:choose>
                        <xsl:when test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]">
                            <xsl:attribute name="data-type">
                                <xsl:value-of select="'TYPE1'"/>
                            </xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="data-type">KEY_BACK</xsl:attribute>
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
                    <xsl:apply-templates select=" @*[name()!='data-stream-name' and name()!='data-input-stream'] "/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:if test=".//*[@class='label'][contains(translate(.,$uppercase,$smallcase),'box')]|.//*[@class!='label']">
                        <xsl:attribute name="data-type">
                            <xsl:value-of select="'TYPE1'"/>
                        </xsl:attribute>
                    </xsl:if>
                    <xsl:apply-templates select=" @* "/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:apply-templates select=" node() "/>
        </div>
    </xsl:template>
    <xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][preceding-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][1]" priority="6">
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
    <xsl:template match="div[@class='body'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]/*[not(matches(@class, 'jrnl(.*?)Block'))][following-sibling::*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]][last()]" priority="6">
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
    <!-- <xsl:template match="div[@class='back'][.//*[@class='jrnlBoxBlock']]" priority="5"> -->
    <xsl:template match="//div[@class='back']/p[last()]" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*|node()"/>
          <!-- <xsl:for-each select="div[@class='jrnlAppBlock'][./*[@class='jrnlBoxBlock']]"> -->
            <xsl:for-each select="//div[@class='back']/div[@class='jrnlAppBlock'][./*[@class='jrnlBoxBlock'][not(.//*[@class='label'])]]">
                <span class="jrnlFirstCitation">
                    <xsl:attribute name="data-rid">
                        <xsl:value-of select="replace(./*[@class='jrnlBoxBlock']/@id,'BLK_','')"/>
                    </xsl:attribute>
                </span>
            </xsl:for-each>
        </xsl:element>
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
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <!-- <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/> -->
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="@*[not(normalize-space())]"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
    <!--<xsl:choose>
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