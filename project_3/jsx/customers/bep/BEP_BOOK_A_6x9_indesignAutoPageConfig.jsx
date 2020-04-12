var config = {
    "defaultUnits":"pt",
    "baseLeading":15,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":false,
    "applyTableBorderWidth":1,
    "applyTableBorderColor":'COLOR1',
    "pageSize":{
        "width":432,
        "height":648
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":6
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":6
            }
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[66,54,600,348
    ],
    "geoBoundsRecto":[66,516,600,810
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "REFERENCE":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":294, "height":516,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":294, "height":534,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":84,
                "bottom":49,
                "inside":84,
                "outside":54
                },
            "otherPageMargin":{
                 "top":66,
                "bottom":49,
                "inside":84,
                "outside":54
                }
            },
        },
    "jrnlBoxBlock":{
        "TINTBOX":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "RULEBOX":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":243, 
      "horizontalCenter":true
    },
    "resizeImage":{
      "allow":false,
      "modifyLimit":0
    },
    "figCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
    "tblCaption":{
      "position":"bottom",
      "sideCaption":{
        "figMinWidth":0,
        "figMaxWidth":0,
        "preferredPlace":"top"
      }
    },
"continuedStyle":{
    "table":{
      "footer": {
        "continuedText": "(<i>(Continued)</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
        "continuedText":"Table [ID].[emsp](<i>(Continued)</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T,EQN-B,EQN",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-T,EQN-B,EQN"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,40],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "docFontsList":[
       {
          "Minion Pro": {
            "Roman": {
                "Symbol (T1)": "Regular"
              },
            "Italic": {
                "Symbol (T1)": "Italic"
              },
            "Bold": {
                "Symbol (T1)": "Bold"
              },
            "Bold Italic": {
                "Symbol (T1)": "Bold"
              }
          }
      },
      
          {
          "Symbol (T1)": {
            "Regular": {
                "Arial Unicode MS": "Regular"
              },
                "Italic": {
                    "Arial Unicode MS": "Regular"
              },
                "Bold": {
                    "Arial Unicode MS": "Regular"
            }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Regular"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Italic"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold"},
            {"fontFamily":"Adobe Garamond Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Goudy", "fontStyle":"Oldstyle"},
            {"fontFamily":"Goudy", "fontStyle":"Oldstyle Italic"},
            {"fontFamily":"Goudy", "fontStyle":"Bold"},
            {"fontFamily":"Goudy", "fontStyle":"Bold Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
          {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlTRTR']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlCorrespBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"35,31,32"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"35,31,32"
                    }
                }            
            },
        "REFERENCE":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"35,31,32"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"35,31,32"
                    }
                }            
            }
        },
        "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "10px",
                    "font-family" : "'Goudy', Goudy"
                },
                "fontPath"  : "Goudy/Goudy.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'GoudyBold',GoudyBold'",
                    "font-size" : "10px",
                    "line-height" : "12px",
                    "padding" : "4px 4px 4px 4px",
                },
                "align" : "left",
                "valign": "top"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'GoudyOldStyle', GoudyOldStyle",
                    "font-size" : "8px",
                    "line-height" : "11px",
                    "padding" : "4px 4px 4px 4px",
                },
                "align" : "left",
                "valign": "top"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "294pt"
              },
              "font" : {
                  "size"    : "10.5pt",
                  "ledding" : "15pt",
                  "path"    : "/AdobeGaramondPro/",
                  "ext"     : "otf",
                  "bold"    : "AdobeGaramondProBold",
                  "italic"  : "AdobeGaramondProItalic",
                  "bold_italic":"AdobeGaramondProBoldItalic",
                  "main"    : "AdobeGaramondProRegular"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "294pt"
              },
              "font" : {
                "size"    : "8pt",
                "ledding" : "11pt",
                "path"    : "/Goudy/",
                "ext"     : "otf",
                    "bold"    : "GoudyBold",
                  "italic"  : "GoudyOldstyleItalic",
                  "bold_italic":"GoudyBoldItalic",
                  "main"    : "GoudyOldstyle"
              }
           }
        },
  }