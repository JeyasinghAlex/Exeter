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
    <!-- DMP Journal Publication Info -->
	<xsl:variable name="journalInfoPara">
        <xsl:choose>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'Dove Medical Press')">
                <xsl:text>Dove Medical Press Review Journal is an international, peer-reviewed open-access journal publishing original case reports from all medical specialties. Previously unpublished medical posters are also accepted relating to any area of clinical or preclinical science. Submissions should not normally exceed 2,000 words or 4 published pages including figures, diagrams and references. The manuscript management system is completely online and includes a very quick and fair peer-review system, which is all easy to use. Visit http://www.dovepress.com/testimonials.php to read real quotes from published authors.</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'International Medical Case Reports Journal')">
                <xsl:text>The International Medical Case Reports Journal is an international, peer-reviewed open-access journal publishing original case reports from all medical specialties. Previously unpublished medical posters are also accepted relating to any area of clinical or preclinical science. Submissions should not normally exceed 2,000 words or 4 published pages including figures, diagrams and references. The manuscript management system is completely online and includes a very quick and fair peer-review system, which is all easy to use. Visit  to read real quotes from published authors.</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'Advances in Medical Education and Practice')">
                <xsl:text>Advances in Medical Education and Practice is an international, peerreviewed, open access journal that aims to present and publish research on Medical Education covering medical, dental, nursing and allied health care professional education. The journal covers undergraduate education, postgraduate training and continuing medical education including emerging trends and innovative models linking education, research, and health care services. The manuscript management system is completely online and includes a very quick and fair peer-review system. Visit to read real quotes from published authors.</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'Adolescent Health, Medicine and Therapeutics')">
                <xsl:text>Adolescent Health, Medicine and Therapeutics is an international, peer-reviewed, open access journal focusing on health, pathology, and treatment issues specific to the adolescent age group. All aspects of health maintenance, preventative measures and disease treatment interventions are addressed within the journal and practitioners from all disciplines are invited to submit their work as well as healthcare researchers and patient support groups. This journal is included in PubMed. The manuscript management system is completely online and includes a very quick and fair peer-review system. Visit http://www.dovepress.com/testimonials.php to read real quotes from published authors.</xsl:text>
            </xsl:when>
			<xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'International Journal of Nanomedicine')">
                <xsl:text>The International Journal of Nanomedicine is an international, peer-reviewed journal focusing on the application of nanotechnology in diagnostics, therapeutics, and drug delivery systems throughout the biomedical field. This journal is indexed on PubMed Central, MedLine, CAS, SciSearch®, Current Contents®/Clinical Medicine, Journal Citation Reports/Science Edition, EMBase, Scopus and the Elsevier Bibliographic databases. The manuscript management system is completely online and includes a very quick and fair peer-review system, which is all easy to use. Visit http://www.dovepress.com/testimonials.php to read real quotes from published authors.</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'Journal of Inflammation Research')">
                <xsl:text>The International Journal of Nanomedicine is an international, peer-reviewed journal focusing on the application of nanotechnology in diagnostics, therapeutics, and drug delivery systems throughout the biomedical field. This journal is indexed on PubMed Central, MedLine, CAS, SciSearch®, Current Contents®/Clinical Medicine, Journal Citation Reports/Science Edition, EMBase, Scopus and the Elsevier Bibliographic databases. The manuscript management system is completely online and includes a very quick and fair peer-review system, which is all easy to use. Visit http://www.dovepress.com/testimonials.php to read real quotes from published authors.</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'HIV/AIDS - Research and Palliative Care')">
                <xsl:text>HIV/AIDS - Research and Palliative Care is an international, peer-reviewed open access journal focusing on advances in research in HIV, its clinical progression and management options including antiviral treatment, palliative care and public healthcare policies to control viral spread. The journal is included in PubMed. The manuscript management system is completely online and includes a very quick and fair peer-review system, which is all easy to use. Visit http://www.dovepress.com/testimonials.php to read real quotes from published authors.</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'][1],'International Journal of Women’s Health')">
                <xsl:text>The International Journal of Women’s Health is an international, peer-reviewed open-access journal publishing original research, reports, editorials, reviews and commentaries on all aspects of women’s healthcare including gynecology, obstetrics, and breast cancer. The manuscript management system is completely online and includes a very quick and fair peer-review system, which is all easy to use. Visit http://www.dovepress.com/testimonials.php to read real quotes from published authors.</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="journalWebsite">
        <xsl:choose>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'Dove Medical Press')">
                <xsl:text>dove-medical-press</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'International Medical Case Reports Journal')">
                <xsl:text>international-medical-case-reports-journal-journal</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'Advances in Medical Education and Practice')">
                <xsl:text>advances-in-medical-education-and-practice-journal</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'Adolescent Health, Medicine and Therapeutics')">
                <xsl:text>adolescent-health-medicine-and-therapeutics-journal</xsl:text>
            </xsl:when>
			<xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'International Journal of Nanomedicine')">
                <xsl:text>international-journal-of-nanomedicine-journal</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'Journal of Inflammation Research')">
                <xsl:text>journal-of-inflammation-research-journal</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'HIV/AIDS - Research and Palliative Care')">
                <xsl:text>hivaids---research-and-palliative-care-journal</xsl:text>
            </xsl:when>
            <xsl:when test="contains(//div[@class='back']//*[@class='jrnlInfo_jrnlTitle'],'International Journal of Women’s Health')">
                <xsl:text>international-journal-of-womens-health-journal</xsl:text>
            </xsl:when>
        </xsl:choose>
    </xsl:variable>
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
            <xsl:choose>
                <xsl:when test="./preceding-sibling::*[1][@class='jrnlAbsTitle']">
                    <span>
                        <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsTitle']/@*|./preceding-sibling::*[1][@class='jrnlAbsTitle']/node()"/>
                    <xsl:text>:</xsl:text>
                    </span>
                    <xsl:text> </xsl:text>
                </xsl:when>
                <xsl:when test="./preceding-sibling::*[1][@class='jrnlAbsHead']">
                    <span>
                        <xsl:apply-templates select="./preceding-sibling::*[1][@class='jrnlAbsHead']/@*|./preceding-sibling::*[1][@class='jrnlAbsHead']/node()"/>
                    <xsl:text>:</xsl:text>
                    </span>
                    <xsl:text> </xsl:text>
                </xsl:when>
            </xsl:choose>
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
    <xsl:template match="*[@class='front']//*[@class='jrnlCorrAffGroup']" priority="5">
      <xsl:variable name="authornode" select="*[@class='front']//*[@class='jrnlAuthorGroup']//*[@class='jrnlCorrRef']/@data-rid"/>
        <div>
            <xsl:apply-templates select="@*"/>
            <xsl:for-each select="./*[@class='jrnlCorrAff']">
                <!--<xsl:variable name="corrid" select="@id"/>
                <xsl:variable name="corrNode" select="//*[@class='front']//*[@class='jrnlAuthorGroup'][./*[@class='jrnlCorrRef'][@data-rid=$corrid]]"/>-->
				<xsl:variable name="corresName" select="./node() except(*[@class = 'jrnlCorrEmail'])"/>
                <xsl:variable name="corresName" select="$corresName except(*[@class = 'jrnlCorrAddress'])"/>
                <xsl:variable name="corresName">
                    <xsl:value-of select="$corresName"/>
                </xsl:variable>
                <xsl:variable name="corresAuthName" select="replace($corresName, ',\s*?$', '')"/>
            <p class="jrnlCorrespAuthor">
                <xsl:if test="count(../*[@class='jrnlCorrAff'])=1">
                    <xsl:apply-templates select="../*[@class='jrnlCorrAffHead']"/>
                </xsl:if>
				<span class="jrnlCorrAuthor">
                    <xsl:value-of select="$corresAuthName"/>
                </span>
                <!--<span class="jrnlCorrAuthor">
                    <xsl:apply-templates select="$corrNode/*[@class='jrnlAuthor']/*[@class='jrnlGivenName']"/>
                    <xsl:apply-templates select="$corrNode/*[@class='jrnlAuthor']/*[@class='jrnlSurName']"/>
                </span>-->
            </p>
			<xsl:if test="./*[@class='jrnlCorrAddress']/node()except(//span[@class = 'jrnlCorrPhoneNo'])">
				<p class="jrnlCorrAddress">
					<xsl:apply-templates select="./*[@class='jrnlCorrAddress']/@*"/>
					<xsl:apply-templates select="./*[@class='jrnlCorrAddress']/node()except(//span[@class = 'jrnlCorrPhoneNo'])"/>
				</p>
			</xsl:if>
            <!--<p class="jrnlCorrAddress">
                <xsl:if test="./*[@class='jrnlDepartment']">
                    <xsl:apply-templates select="./*[@class='jrnlDepartment']"/>
                    <xsl:text>, </xsl:text>
                </xsl:if>
                <xsl:if test="./*[@class='jrnlInstitution']">
                    <xsl:apply-templates select="./*[@class='jrnlInstitution']"/>
                    <xsl:text>, </xsl:text>
                </xsl:if>
                <xsl:if test="./*[@class='jrnlCity']">
                    <xsl:apply-templates select="./*[@class='jrnlCity']"/>
                    <xsl:text>, </xsl:text>
                </xsl:if>
                <xsl:if test="./*[@class='jrnlState']">
                    <xsl:apply-templates select="./*[@class='jrnlState']"/>
                    <xsl:text>, </xsl:text>
                </xsl:if>
                <xsl:if test="./*[@class='jrnlCountry']">
                    <xsl:apply-templates select="./*[@class='jrnlCountry']"/>
                </xsl:if>
            </p>-->
            <xsl:if test=".//*[@class='jrnlCorrPhoneNo']">
                <p class="jrnlCorrPhoneNo">
                    <xsl:apply-templates select="./*[@class='jrnlCorrAddress']/*[@class='jrnlCorrPhoneNo']/@*[name()!='class']"/>
                    <xsl:text>Tel </xsl:text>
                    <xsl:apply-templates select="./*[@class='jrnlCorrAddress']/*[@class='jrnlCorrPhoneNo']/node()"/>
                </p>
            </xsl:if>
            <xsl:if test=".//*[@class='jrnlCorrFaxNo']">
                <p class="jrnlCorrFaxNo">
                    <xsl:apply-templates select="./*[@class='jrnlCorrAddress']/*[@class='jrnlCorrFaxNo']/@*[name()!='class']"/>
                    <xsl:text>Fax </xsl:text>
                    <xsl:apply-templates select="./*[@class='jrnlCorrAddress']/*[@class='jrnlCorrFaxNo']/node()"/>
                </p>
            </xsl:if>
            <xsl:if test="./*[@class='jrnlCorrEmail']">
                <p class="jrnlCorrEmail">
                    <xsl:variable name="corrEmail" select="./*[@class='jrnlCorrEmail']/node()"/>
                    <xsl:variable name="href">
                        <xsl:value-of select="concat('mailto:',$corrEmail)"/>
                    </xsl:variable>
                    <xsl:text>Email </xsl:text>
                    <a href="{$href}">
                        <xsl:value-of select="$corrEmail"/>
                    </a>
                </p>
            </xsl:if>
            </xsl:for-each>
        </div>
    </xsl:template>
    <xsl:template match="*[@class='front']//*[@class='jrnlAuthors']//*[@class='jrnlAuthorGroup']//*[@class='jrnlCorrRef']" priority="6"/>
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
    
    <xsl:template match="//p[@class='jrnlAff'][@removeNode='true']" priority="5"/>
    
    <xsl:template match="//*[@class='jrnlFigCaption']/*[@class='label']|//*[@class='jrnlBoxCaption']/*[@class='label']|//*[@class='jrnlTblCaption']/*[@class='label']|//*[@class='jrnlVidCaption']/*[@class='label']" priority="5">
        <xsl:variable name="labelName" select="."/>
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
    <xsl:template match="//text" priority="5">
        <xsl:apply-templates/>
    </xsl:template>
    <xsl:template match="div[@class='front']//*[@class='jrnlAffGroup'][@removeAffLabel='true']" priority="5">
        <xsl:element name="{name(.)}">
            <xsl:apply-templates select="@*"/>
            <xsl:choose>
                <xsl:when test="count(.//*[@class='jrnlAff'])=1">
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
    <xsl:template match="//div[@type='main']" priority="6">
        <div type="main">
            <xsl:apply-templates select="@*"/>
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
            <xsl:for-each select="//*[@class='jrnlJournalInfo']">
				<xsl:variable name="pid" select="concat('BLK_BXO',position())"/>
				<div class="floatBlock" id="{$pid}" data-stream-name="{concat('a_BXO',position())}" data-id="{concat('BXO',position())}">
					<div class="jrnlOnlineBox" id="{$pid}" data-id="{concat('BXO',position())}" data-stream-name="{concat('a_BXO',position())}">
						<xsl:apply-templates select="./*[contains(@class,'jrnlTitle')]"/>
						<xsl:apply-templates select="./*[contains(@class,'jrnlJournalInfoHead')]"/>
						<p class="jrnlJournalInfoPara">
						    <xsl:value-of select="$journalInfoPara"/>
				        </p>
						<p class="jrnlJournalWebsiteInfo">
						    <xsl:apply-templates select="./*[@class='jrnlJournalWebsiteInfo']/*[contains(@class,'jrnlWebsiteStartPunc')]"/>
						    <xsl:variable name="href1">
                                <xsl:choose>
                                    <xsl:when test="$journalWebsite != ''">
                                        <xsl:value-of select="concat('http://www.dovepress.com/',$journalWebsite)"/>
                                    </xsl:when>
                                </xsl:choose>
                            </xsl:variable>
                            <xsl:choose>
                                <xsl:when test="$href1 !=''">
                                    <a href="{$href1}">
                                        <span class="jrnlJournalWebsite">
                                            <xsl:value-of select="$href1"/>
                                        </span>
                                    </a>
                                </xsl:when>
                                <xsl:otherwise>
                                </xsl:otherwise>
                            </xsl:choose>
					    </p>
					</div>
				</div>
            </xsl:for-each>
            <xsl:apply-templates/>
        </div>
    </xsl:template>
    <xsl:template match="*[@class='jrnlAppGroup']/*[@class='jrnlAppBlock'][1]" priority="5">
        <xsl:element name="{./name()}">
            <xsl:apply-templates select="./@*"/>
            <h1 class="jrnlAppHead1">Supplementary files</h1>
             <xsl:apply-templates select="./node()"/>
        </xsl:element>
    </xsl:template>
    <xsl:template match="*[@class='jrnlSupplGroup']//*[@class='jrnlSupplBlock']" priority="5">
        <xsl:choose>
            <xsl:when test="./node()">
                <xsl:element name="{./name()}">
                    <xsl:apply-templates select="./@*"/>
                    <xsl:if test="not(preceding::*[@class='jrnlSupplBlock'])">
                <h1 class="jrnlSupplHead">Supplementary files</h1>
                 <xsl:apply-templates select="./node()"/>
            </xsl:if>
                </xsl:element>
            </xsl:when>
            <xsl:otherwise>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- Remove custom meta data query -->
	<xsl:template match="*[@class='front']/*[@class='jrnlCustomMetaGroup']" priority="5"/>
	<!-- Construct [AQ] for AuthorQuery -->
    <xsl:template match="//*[@class='jrnlQueryRef'][@data-citation-string]" priority="6">
        <span>
            <xsl:apply-templates select="@*"/>
        </span>
    </xsl:template>
    <xsl:template match="*[@class='back']//*[@class='jrnlJournalInfo']" priority="5"/>
     <!-- remove doi from reference -->
    <xsl:template match="*[@class='jrnlRefText']/*[@class='RefDOI']" priority="5"/>
    <xsl:template match="//span[@class='jrnlFirstCitation'][contains(@data-rid, ' SP')]" priority="5"/>
    <xsl:template match="*[@class='jrnlFigBlock']/img" priority="5"/>
    <xsl:template match="div[@class='body']//*[@class='jrnlEJHPStmtBlock']" priority="5"/>
    <xsl:template match="*[@class='jrnlAbsPara'][./*[@class='jrnlAbsBox']]" priority="5"/>
    <xsl:template match="@removeDOIForPrint|@removeDOIForOnline|@etalAuthors|@startPunc|@interPunc|@endPunc|@penultimatePunc|@removeifempty|@maxAuthors|@abbrevGivenNames|@etalPunc|@format|@case|@section|@default|@printOnly|@onlineOnly"/>
    <xsl:template match="//div[@class='jrnlTblBlock']/p[@class='jrnlTblFoot']" priority="5"/>
    <xsl:template match="//div[@class='body']/*[@class='jrnlConfFNGroup']" priority="5"/>
	<!--<xsl:template match="@*[not(normalize-space())]"/>-->
</xsl:stylesheet>