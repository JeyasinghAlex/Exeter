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
        <item>bjsm</item>
        <item>aim</item>
        <item>heart</item>
        <item>adc</item>
    </xsl:variable>
	<xsl:variable name="journalLinkID">
      <xsl:choose>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Ecology and Evolution')">
                <xsl:text>ecology_and_evolution</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Physiology')">
                <xsl:text>physiology</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Plant Science')">
                <xsl:text>Plant_Science</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Frontiers in Genetics')">
                <xsl:text>genetics</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Cardiovascular Medicine')">
                <xsl:text>Cardiovascular_Medicine</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Frontiers in Surgery')">
                <xsl:text>Surgery</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Frontiers in Robotics and AI')">
                <xsl:text>Robotics_and_AI</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle'],'Frontiers in Veterinary Science')">
                <xsl:text>Veterinary_Science</xsl:text>
            </xsl:when>
        </xsl:choose>
     
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
                        <xsl:choose>
                            <xsl:when test="(../*[@class='jrnlOnBehalfOf'])[1] is ."/>
                            <xsl:otherwise>
                                <xsl:value-of select="./@startPunc"/>
                                <xsl:text> </xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
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
    <xsl:template match="//div[@class='front']//p[@class='jrnlArtTitle']" priority="5">
          <xsl:element name="{local-name()}">
                <xsl:apply-templates select="@*"/>
                <xsl:variable name="doi1">
                    <xsl:value-of select="//*[@class='jrnlDOIMeta']//*[@class='jrnlDOI'][1]"/>
                </xsl:variable>
                 <xsl:variable name="href1">
                    <xsl:value-of select="concat('http://www.frontiersin.org/articles/',$doi1,'/full')"/>
                </xsl:variable>
                <a href="{$href1}">
                    <xsl:apply-templates select="node()"/>
                </a>
            </xsl:element>
    </xsl:template>
    <xsl:template match="//p[@class='jrnlTVBR' or @class='jrnlTRBR' or @class='jrnlCVBR' or @class='jrnlCRBR']" priority="5">
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:variable name="href1">
                <!-- <xsl:choose>
                    <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTitle'],'Ecology and Evolution')">
                        <xsl:text>https://www.frontiersin.org/journals/ecology_and_evolution#articles</xsl:text>
                    </xsl:when>
                </xsl:choose> -->
                <xsl:choose>
                    <xsl:when test="$journalLinkID != ''">
                        <xsl:value-of select="concat('https://www.frontiersin.org/journals/',$journalLinkID,'#articles')"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="$href1 !=''">
                    <a href="{$href1}">
                        <xsl:apply-templates select="node()"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='front']/*[@class='jrnlPubDateMeta']" priority="5">
        <xsl:element name="{local-name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:variable name="href1">
                <xsl:choose>
                  <!--  <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTitle'],'Ecology and Evolution')"> -->
                    <xsl:when test="$journalLinkID != ''">
                        <!--<xsl:text>http://www.frontiersin.org/Ecology_and_Evolution/editorialboard</xsl:text>-->
                        <xsl:value-of select="concat('http://www.frontiersin.org/',$journalLinkID,'/editorialboard')"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="$href1 !=''">
                    <a href="{$href1}">
                        <xsl:apply-templates select="node()"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='front']/*[@class='jrnlArtType']" priority="5">
        <xsl:element name="{local-name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:variable name="href1">
                <xsl:choose>
                   <!-- <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTitle'],'Ecology and Evolution')"> -->
                    <xsl:when test="$journalLinkID != ''">
                      <!--  <xsl:text>http://www.frontiersin.org/Ecology_and_Evolution/editorialboard</xsl:text> -->
                        <xsl:value-of select="concat('http://www.frontiersin.org/',$journalLinkID,'/editorialboard')"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="$href1 !=''">
                    <a href="{$href1}">
                        <xsl:apply-templates select="node()"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//p[@class='jrnlTVBL' or @class='jrnlTRBL' or @class='jrnlCVBL' or @class='jrnlCRBL']/*[@class='jrnlTitle']" priority="5">
        <xsl:element name="{local-name()}">
            <xsl:apply-templates select="@*"/>
            <xsl:variable name="href1">
               <xsl:choose>
                    <!-- <xsl:when test="contains(//div[@class='front']//*[@class='jrnlTitle'],'Ecology and Evolution')"> -->
                    <xsl:when test="$journalLinkID != ''">
                       <!-- <xsl:text>https://www.frontiersin.org/journals/ecology_and_evolution</xsl:text> -->
                        <xsl:value-of select="concat('http://www.frontiersin.org/journals/',$journalLinkID)"/>
                    </xsl:when>
                </xsl:choose>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="$href1 !=''">
                    <a href="{$href1}">
                        <xsl:apply-templates select="node()"/>
                    </a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:apply-templates select="node()"/>
                </xsl:otherwise>
            </xsl:choose>
        </xsl:element>
    </xsl:template>
    <xsl:template match="//div[@class='front']/p[@class='jrnlAuthors']" priority="5">
        <p class="jrnlAuthors">
            <xsl:variable name="count">
                <xsl:value-of select="count(./*[@class='jrnlAuthorGroup'])"/>
            </xsl:variable>
            <xsl:for-each select="./*[@class='jrnlAuthorGroup']">
                <xsl:variable name="pos">
                    <xsl:value-of select="position()"/>
                </xsl:variable>
                <xsl:choose>
                    <xsl:when test="./*[@class='jrnlAuthorUrl']!=''">
                        <span class="jrnlAuthorGroup">
                            <xsl:apply-templates select="./@*"/>
                            <xsl:for-each select="./node()">
                                <xsl:choose>
                                    <xsl:when test="./@class='jrnlAuthor'">
                                        <a href="{concat(./following-sibling::*[@class='jrnlAuthorUrl'],'/overview')}">
                                            <xsl:apply-templates select="."/>
                                        </a>
                                    </xsl:when>
                                    <xsl:when test="./@class='jrnlAuthorUrl'"/>
                                    <xsl:otherwise>
                                        <xsl:apply-templates select=".except(*[@class='jrnlAuthorUrl'])"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:for-each>
                            <xsl:choose>
                                <xsl:when test="$pos = ($count - 1)">
                                    <xsl:text> and </xsl:text>
                                </xsl:when>
                                <xsl:when test="$pos = $count"/>
                                <xsl:otherwise>
                                    <xsl:text>, </xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>
                        </span>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:apply-templates select=".except(*[@class='jrnlAuthorUrl'])"/>
                        <xsl:choose>
                            <xsl:when test="$pos = ($count - 1)">
                                    <xsl:text> and </xsl:text>
                                </xsl:when>
                                <xsl:when test="$pos = $count"/>
                                <xsl:otherwise>
                                    <xsl:text>, </xsl:text>
                                </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>
        </p>
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
     <xsl:template match="//span[@data-class='jrnlExtLink'][@data-href]" priority="5">
        <xsl:choose>
            <xsl:when test="./text()!=''">
                <span class="jrnlExtLink" data-type="uri" data-href="{@data-href}">
                    <a href="{@data-href}" target="_blank" data-mce-href="{@data-href}">
                        <xsl:apply-templates/>
                    </a>
                </span>
            </xsl:when>
            <xsl:otherwise>
                <span>
                    <xsl:apply-templates select="@*|node()"/>
                </span>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//div[@class='front']//*[@class='jrnlSubTitle']" priority="5">
    <xsl:variable name="subTitle" select="node()"/>
    <xsl:variable name="title" select="//div[@class='front']//*[@class='jrnlTVBL']//*[@class='jrnlTitle']/node()"/>
        <div class="jrnlSpecialityGroup">
            <p class="jrnlSpecialityHead">
                <xsl:text>Specialty section:</xsl:text>
            </p>
            <!--
-->
            <p class="jrnlSpecialityPara">
                <xsl:text>This article was submitted to </xsl:text>
                <xsl:variable name="lastWord" select="tokenize($subTitle,' ')[last()]"/>
                <xsl:variable name="lastWord" select="concat(' ',$lastWord)"/>
                 <xsl:variable name="tempWord" select="substring-before($subTitle,$lastWord)"/>
                 <xsl:variable name="lastWord" select="replace($lastWord,' ',' ')"/>
                <xsl:value-of select="concat($tempWord,$lastWord)"/>
                <!--<xsl:value-of select="$subTitle"/> -->
                <xsl:text>,
a section of the journal </xsl:text>
                <xsl:text>
</xsl:text>
                <xsl:value-of select="$title"/>
            </p>
        </div>
    </xsl:template>
    <xsl:template match="//div[@class='front']//*[@class='jrnlAbsHead']" priority="5"/>
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
     <!--<xsl:template match="//div[@class='front']//*[@class='jrnlAbsHead']" priority="5">
        <xsl:variable name="nextNode" select="following-sibling::*/@class"/>
        <xsl:choose>
            <xsl:when test="$nextNode[contains(.,'jrnlAbsTitle')]"/>
            <xsl:otherwise>
             <h1 class="jrnlAbsHead">
                    <xsl:apply-templates/>
                </h1>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template> -->
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']" priority="5">
        <p class="jrnlAbsPara">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
   <!-- <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5">
        <span>
            <xsl:apply-templates select="@*|node()"/>
        </span>
    </xsl:template> -->
    <xsl:template match="//div[@class='front']//h2[@class='jrnlAbsTitle']" priority="5"/>
    <xsl:template match="//div[@class='front']//p[@class='jrnlAbsPara']" priority="5">
        <p>
            <xsl:apply-templates select="@*"/>
            <xsl:if test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                <span>
                    <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*|./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
                    <xsl:text>:</xsl:text>
                </span>
                <xsl:text> </xsl:text>
            </xsl:if>
            <xsl:apply-templates select="node()"/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='front']//div[@class='jrnlAbsSec']/p[@class='jrnlAbsPara']" priority="5">
        <span>
            <xsl:apply-templates select="@*"/>
            <xsl:text> </xsl:text>
            <xsl:apply-templates select="node()"/>
        </span>
    </xsl:template>
    <xsl:template match="p[@class='jrnlCorrAff']" priority="5">
        <div class="corrAffAuthor">
            <xsl:variable name="corrEmail" select="./*[@class='jrnlCorrEmail']/node()"/>
            <xsl:variable name="corrEmail" select="replace($corrEmail, '; |; ', '; ;')"/>
			<xsl:variable name="corrEmail" select="tokenize($corrEmail,' ;|,')"/>
			<xsl:variable name="corresName" select="./node() except(*[@class = 'jrnlCorrEmail'])"/>
			<xsl:variable name="corresName" select="replace($corresName, ',\s?$', '')"/>
            <p class="jrnlCorrAff">
               <!-- <xsl:apply-templates select="./node() except(span[@class = 'jrnlCorrEmail'])"/> -->
			   <xsl:value-of select="$corresName"/>
            </p>
            <!--<p class="jrnlCorrEmail">
                <xsl:variable name="href">
                    <xsl:value-of select="concat('mailto:',$corrEmail)"/>
                </xsl:variable>
                <a href="{$href}">
                    <xsl:value-of select="$corrEmail"/>
                </a>
            </p> -->
            <xsl:for-each select="$corrEmail">
                <p class="jrnlCorrEmail">
                    <xsl:variable name="href">
                        <xsl:value-of select="concat('mailto:',.)"/>
                    </xsl:variable>
                    <a href="{$href}">
                        <xsl:value-of select="."/>
                    </a>
                </p>
         </xsl:for-each>
        </div>
    </xsl:template>  
   <!-- <xsl:template match="span[@class='jrnlCorrEmail']" priority="5">
        <p class="jrnlCorrEmail">
            <xsl:apply-templates/>
        </p>
    </xsl:template> -->
    <!--xsl:template match="//*[@class='jrnlConfPara'][1]" priority="5"/-->
	<!--<xsl:template match="//div[@class='jrnlRelArt']" priority="5">
            <p>
                <xsl:apply-templates select="@*|node()except(*[@class = 'jrnlRelArtTitle'])"/>
            </p>
            <xsl:apply-templates select="./*[@class = 'jrnlRelArtTitle']"/>
    </xsl:template> -->
         <xsl:template match="//*[@class='jrnlLicensePara']/*[@class='jrnlExtLink']" priority="5">
         <xsl:apply-templates/>
         </xsl:template>
    <xsl:template match="//div[@class='jrnlRelArt']" priority="5">
        <xsl:choose>
            <xsl:when test="./@related-article-type='corrected-article'">
                <xsl:variable name="comment" select="./node()except(*[@class = 'jrnlRelArtTitle']|*[@class='jrnlRelArtObjectId'])"/>
                <xsl:variable name="commentry">
                    <xsl:value-of select="tokenize($comment[1],'A commentary on ')"/>
                </xsl:variable>
                <p class="jrnlRelArt">
                    <xsl:value-of select="$comment[1]"/>
                </p>
                <p class="jrnlRelArtTitleNoSpace">
                    <xsl:apply-templates select="./*[@class = 'jrnlRelArtTitle']/node()"/>
                </p>
                <p class="jrnlRelArtObjectId">
                    <xsl:value-of select="$comment[2]"/>
                    <xsl:apply-templates select="./*[@class = 'jrnlRelArtObjectId']/node()"/>
                </p>
            </xsl:when>
            <xsl:when test="./@related-article-type='commentary-article'">
                <xsl:variable name="comment" select="./node()except(*[@class = 'jrnlRelArtTitle']|*[@class='jrnlRelArtObjectId'])"/>
                <xsl:choose>
                    <xsl:when test="starts-with($comment[1],'A commentary on')">
                        <xsl:variable name="commentry">
                            <xsl:value-of select="tokenize($comment[1],'A commentary on ')"/>
                        </xsl:variable>
                        <p class="jrnlRelArt">
                            <xsl:value-of select="$comment[1]"/>
                        </p>
                        <p class="jrnlRelArtTitleNoSpace">
                            <xsl:apply-templates select="./*[@class = 'jrnlRelArtTitle']/node()"/>
                        </p>
                        <p class="jrnlRelArtObjectId">
                            <xsl:value-of select="$comment[2]"/>
                            <xsl:apply-templates select="./*[@class = 'jrnlRelArtObjectId']/node()"/>
                        </p>
                    </xsl:when>
                    <xsl:otherwise>
                        <p>
                            <xsl:apply-templates select="@*|node()except(*[@class = 'jrnlRelArtTitle'])"/>
                        </p>
                        <xsl:apply-templates select="./*[@class = 'jrnlRelArtTitle']"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:when>
            <xsl:otherwise>
               <!-- <p>
                    <xsl:apply-templates select="@*|node()except(*[@class = 'jrnlRelArtTitle'])"/>
                </p>
                <xsl:apply-templates select="./*[@class = 'jrnlRelArtTitle']"/> -->
               
                <xsl:apply-templates select="node()except(*[@class = 'jrnlRelArtAuthorGroup']|*[@class = 'jrnlRelArtPublisherLoc']|*[@class = 'jrnlRelArtPublisherName']|*[@class = 'jrnlYear']|*[@class = 'jrnlRelArtPageRange']|*[@class='jrnlRelArtISBN'])"/>
                <xsl:if test="./*[@class='jrnlRelArtAuthorGroup']">
                    <p class="jrnlRelArtInfo">
                        <xsl:apply-templates select="./*[@class='jrnlRelArtAuthorGroup']"/>
                        <xsl:apply-templates select="./*[@class='jrnlRelArtPublisherLoc']"/>
                        <xsl:apply-templates select="./*[@class='jrnlRelArtPublisherName']"/>
                        <xsl:apply-templates select="./*[@class='jrnlYear']"/>
                        <xsl:apply-templates select="./*[@class='jrnlRelArtPageRange']"/>
                        <xsl:apply-templates select="./*[@class='jrnlRelArtISBN']"/>
                   </p>
                </xsl:if>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlConfFN']/*[@class='jrnlConfHead']" priority="5">
        <p class="jrnlConfFNFirst">
            <span class="jrnlConfFNHead">
                <xsl:apply-templates select="node()"/>
                <xsl:text>: </xsl:text>
            </span>
            <span class="jrnlConfFNPara">
                <xsl:apply-templates select="//*[@class='jrnlConfPara'][1]/node()"/>
            </span>
        </p>
    </xsl:template>
    <xsl:template match="//*[@class='jrnlConfPara']" priority="5">
        <xsl:if test="./preceding-sibling::*[@class='jrnlConfPara']">
	        <p class="jrnlConfFNPara">
	            <xsl:apply-templates/>
	        </p>
        </xsl:if>
    </xsl:template>
     <xsl:template match="//div[@class='jrnlEthicsFN' or @class='jrnlConFN'][not(.//*[@class][matches(./@class, 'jrnl(.*?)Head')])]" priority="5">
        <xsl:variable name="class">
            <xsl:value-of select="./@class"/>
        </xsl:variable>
    <xsl:variable name="fnHeadclass">
	<xsl:choose>
		<xsl:when test="$class='jrnlEthicsFN'">jrnlEthicsFNHead</xsl:when>
		<xsl:when test="$class='jrnlConFN'">,jrnlConHead</xsl:when>
	</xsl:choose>
    </xsl:variable>
    <div>
        <xsl:apply-templates select="@*"/>
        <xsl:if test="./@data-label">
            <h1>
                <xsl:attribute name="class">
                    <xsl:value-of select="$fnHeadclass"/>
                </xsl:attribute>
                <xsl:value-of select="./@data-label"/>
            </h1>
        </xsl:if> 
         <xsl:apply-templates select="node()"/>
    </div>
    </xsl:template>
    <xsl:template match="//p[@class='jrnlAff'][@removeNode='true']" priority="5"/>
    <xsl:template match="//sup[@class='jrnlAffRef'][@getaff='true']" priority="5">
        <xsl:variable name="refID" select="./@data-rid"/>
        <p class="jrnlAff">
            <xsl:variable name="institution" select="//div[@class='front']//p[@class='jrnlAff'][@id=$refID]//*[@class='jrnlInstitution']"/>
            <xsl:variable name="country" select="//div[@class='front']//p[@class='jrnlAff'][@id=$refID]//*[@class='jrnlCountry']"/>
             <xsl:variable name="city" select="//div[@class='front']//p[@class='jrnlAff'][@id=$refID]//*[@class='jrnlCity']"/>
             <xsl:variable name="jrnlInstitutionData" select="//div[@class='front']//p[@class='jrnlAff'][@id=$refID]//*[@class='jrnlInstitution']/text()"/>
            <span class="jrnlInstitution">
               <xsl:apply-templates select="$institution"/>
            </span>
            <!-- jrnlCity shoul display only when jrnlInstitution is Independent Researcher-->
            <xsl:if test="$jrnlInstitutionData='Independent Researcher'">
                <xsl:if test="$city != ''">
                    <xsl:text>, </xsl:text>
                    <span class="jrnlCity">
                        <xsl:value-of select="$city"/>
                    </span>
                </xsl:if>
            </xsl:if>
            <xsl:text>, </xsl:text>
            <span class="jrnlCountry">
                <xsl:value-of select="$country"/>
            </span>
        </p>
    </xsl:template>
     <xsl:template match="//div[@class='jrnlPresentAddrFN']" priority="5">
      <div class="jrnlPresentAddrFN"> 
         <xsl:for-each select="./*[@class='jrnlPresentAddrFNHead'][1]">
           <p>
                <xsl:apply-templates select="./@*"/>
                <sup>
                    <xsl:apply-templates select="./node()"/>
                </sup>
               <xsl:if test="@endPunc">
                    <xsl:value-of select="./@endPunc"/>
                </xsl:if>
            </p>
        </xsl:for-each>
        <xsl:for-each select=".//p[@class='jrnlPresentAddrFNPara'][@id]">
             <xsl:variable name="refID" select="./@id"/>
               <xsl:variable name="count">
                        <xsl:value-of select="count(//div[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthor'][following-sibling::*[@class='jrnlPresentAddrRef'][@data-rid=$refID]])"/>
                </xsl:variable>
                <xsl:for-each select="//div[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthor'][following-sibling::*[@class='jrnlPresentAddrRef'][@data-rid=$refID]]">
                <p class="jrnlPresentAddrAuthors">
                    <xsl:variable name="pos">
                        <xsl:value-of select="position()"/>
                    </xsl:variable>
                    <span class="jrnlAuthor">
                        <xsl:apply-templates select="./node()"/>
                        <xsl:choose>
                            <xsl:when test="$pos = $count"/>
                            <xsl:otherwise>
                                <xsl:text> , </xsl:text>
                            </xsl:otherwise>
                        </xsl:choose>
                    </span>
                 </p>
                </xsl:for-each>
                    <xsl:apply-templates select="."/>
              </xsl:for-each>
              </div>
       <!-- <div>
            <xsl:apply-templates select="./@*"/>
            <xsl:apply-templates select="./*[@class='jrnlPresentAddrFNHead']"/>
            <div class="jrnlPresentAddrFNPara">
           
                <p class="jrnlPresentAddrAuthors">
                    <xsl:variable name="count">
                        <xsl:value-of select="count(//div[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthor'][following-sibling::*[@class='jrnlPresentAddrRef'][@data-rid=$refID]])"/>
                    </xsl:variable>
                    <xsl:for-each select="//div[@class='front']/p[@class='jrnlAuthors']//*[@class='jrnlAuthor'][following-sibling::*[@class='jrnlPresentAddrRef'][@data-rid=$refID]]">
                        <xsl:variable name="pos">
                            <xsl:value-of select="position()"/>
                        </xsl:variable>
                        <span class="jrnlAuthor">
                            <xsl:apply-templates select="./node()"/>
                            <xsl:choose>
                                <xsl:when test="$pos = $count"/>
                                <xsl:otherwise>
                                    <xsl:text> , </xsl:text>
                                </xsl:otherwise>
                            </xsl:choose>
                        </span>
                    </xsl:for-each>
                </p>
                <p>
                    <xsl:apply-templates select="./*[@class='jrnlPresentAddrFNPara']/@*"/>
                    <xsl:apply-templates select="./*[@class='jrnlPresentAddrFNPara']/node()"/>
                </p>
            </div> -->
    </xsl:template>
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']|//*[@class='jrnlSupplCaption']/*[@class='label']" priority="5">
        <!--<xsl:variable name="labelName" select="replace(.,'[ | ]+','')"/>
        <xsl:variable name="labelName" select="replace($labelName, '^\s*(.+?)\s*$', '$1')"/>-->
        <xsl:variable name="labelName" select="concat(.,' | ')"/>
        <span class="label">
            <xsl:value-of select="$labelName"/>
        </span>
    </xsl:template>
<!-- Moved this firstcitation template match to structure.xsl -->
<!--
    <xsl:template match="//span[@class='jrnlFigRef']|//span[@class='jrnlVidRef']|//span[@class='jrnlTblRef']|//span[@class='jrnlBoxRef']" priority="5">
	<xsl:variable name="citationString" select="./@data-citation-string"/>
        <xsl:if test="./@data-anchor = 'true' and not(contains($citationString,' FS')) and not(contains($citationString,' TS'))">
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
           <!--  <xsl:if test="../../p[@class='jrnlTblFoot']">
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
    <xsl:template match="//p[@class='jrnlRefText' or @class='jrnlAppRefText']/span[@class='RefDOI'][.!='']" priority="5">
        <xsl:variable name="doi" select="replace(.,'doi:','')"/>
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
        <span class="RefDOI">
            <xsl:text> doi: </xsl:text>
            <a href="{$doi}">
                <xsl:apply-templates/>
            </a>
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
    <xsl:template match="//p[@class='jrnlCorrAffHead']" priority="5">
        <xsl:if test="not(//div[@class='front']//*[@class='jrnlAffGroup'])">
            <p class="jrnlCorrAffHeadNoAff">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
        <xsl:if test="//div[@class='front']//*[@class='jrnlAffGroup']">
            <p class="jrnlCorrAffHead">
                <xsl:apply-templates/>
            </p>
        </xsl:if>
    </xsl:template>
    <xsl:template match="//div[@class='jrnlAff']/span[@class='jrnlInstitution']" priority="5">
        <p class="jrnlInstitution">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="//div[@class='jrnlAff']/span[@class='jrnlCountry']" priority="5">
        <p class="jrnlCountry">
            <xsl:apply-templates/>
        </p>
    </xsl:template>
    <xsl:template match="//p[@class='jrnlRRH']" priority="5">
        <span class="jrnlShortTitle">
            <xsl:apply-templates/>
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
                <xsl:attribute name="alt">
                    <xsl:value-of select="./@alt"/>
                </xsl:attribute>
                <xsl:apply-templates select="./@*[contains(name(.), 'data-')]"/>
            </xsl:element>
            </xsl:for-each>
            <xsl:apply-templates select=" node()"/>
        </div>
    </xsl:template>
    <!--<xsl:template match="//td[contains(@*, data-cell-width-tablesetter)]" priority="5">-->
   <!-- <xsl:template match="//td[@*[contains(@*, data-cell-width-tablesetter)]]" priority="5">
        <xsl:element name="{name(.)}">-->
            <!--<xsl:apply-templates select="@*|node()"/>-->
           <!-- <xsl:apply-templates select="@*[not(contains(name(),'data-cell-width-tablesetter'))]"/>
            <xsl:attribute name="data-cell-width-tablesetter">
                <xsl:value-of select="sum(./@*[contains(name(),'data-cell-width-tablesetter')])"/>
            </xsl:attribute>
            <xsl:apply-templates/>
        </xsl:element>
    </xsl:template> -->
    <!--<xsl:template match="//div[@class='jrnlFundingGroup']" priority="5">
        <p class="jrnlFundingHead">Funding</p>
		<p class="jrnlFundingStatement">
            <xsl:apply-templates select=".//*[@class='jrnlFundingStatement']/td/node()"/>
        </p>
    </xsl:template>-->
    <xsl:template match="//h1[@class='jrnlFundingHead']" priority="5">
        <xsl:choose>
            <xsl:when test="//*[@class='jrnlFundingStatement'][.!='' and .!='None specified']">
              
                <h1 class="jrnlFundingHead">
                    <xsl:apply-templates select="@*|node()"/>
               </h1>
            </xsl:when>
            <xsl:otherwise/>
        </xsl:choose>
    </xsl:template>
	<xsl:template match="//div[@class='jrnlFundingGroup']" priority="5">
        <xsl:choose>
            <!--<xsl:when test=".//*[@class='jrnlFundingStatement']/node()"> -->
            <xsl:when test=".//*[@class='jrnlFundingStatement'][.!='' and .!='None specified']">
               <!-- <p class="jrnlFundingHead">Funding</p> -->
                <p class="jrnlFundingStatement">
                    <xsl:apply-templates select=".//*[@class='jrnlFundingStatement']/node()"/>
                </p>
            </xsl:when>
            <xsl:otherwise/>
        </xsl:choose>
    </xsl:template>
   <xsl:template match="//div[@class='jrnlSupplBlock']" priority="5">
        <xsl:choose>
            <xsl:when test=".//*[@class='jrnlSupplCaption'][./text()]">
                <div>
                    <xsl:apply-templates select="./@*"/>
                    <xsl:for-each select=".//*[@class='jrnlSupplCaption'][./text()]">
                        <p>
                            <xsl:apply-templates select="./@*"/>
                            <xsl:apply-templates select="./node()"/>
                        </p>
                    </xsl:for-each>
                </div>
            </xsl:when>
            <xsl:otherwise/>
        </xsl:choose>
     </xsl:template>
	 <xsl:template match="//div[@type='main']" priority="5">
        <div type="main">
            <xsl:for-each select="//*[@class='body']//*[@class='jrnlBoxBlock'][name((ancestor::*[@class='jrnlAbsPara'])[last()]) = '']|//*[@class='jrnlBoxBlockGroup']|//*[@class='back']/*[@class='jrnlAppBlock']/*[@class='jrnlBoxBlock']">
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
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="//*[@class='body' or @class='back']//*[@class='jrnlBoxBlock']" priority="6"/>
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
	<xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
    <xsl:template match="//div[@class='body']/*[@class='jrnlConfFNGroup']" priority="5"/>
	<xsl:template match="//div[@class='jrnlFootNote']/*[@class='jrnlFootNotePara']/sup" priority="5"/>
	<!--<xsl:template match="@*[not(normalize-space())]"/>-->
</xsl:stylesheet>