<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match = "@* | node()">
    <xsl:copy>
        <xsl:apply-templates select = "@* | node()"/>
    </xsl:copy>
</xsl:template>

<xsl:template match = "@id">
    <xsl:choose>

        <xsl:when test = ". = 'one'">
            <xsl:attribute name = "id">
                <xsl:text>td1</xsl:text>
            </xsl:attribute>
        </xsl:when>
    
    <xsl:when test = ". = 'two'">
        <xsl:attribute name = "id">
            <xsl:text>td2</xsl:text>
        </xsl:attribute>
    </xsl:when>

    <xsl:when test = ". = 'three'">
        <xsl:attribute name = "id">
            <xsl:text>td3</xsl:text>
        </xsl:attribute>
    </xsl:when>

    <xsl:when test = ". = 'four'">
        <xsl:attribute name = "id">
            <xsl:text>td4</xsl:text>
        </xsl:attribute>
    </xsl:when>

    </xsl:choose>

</xsl:template>
</xsl:stylesheet>



