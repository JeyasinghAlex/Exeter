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
    "adjustTopWrapOfFrame":"STUB_COLUMN",
    "textAllowedOnPageWhenFloatContinues":true,
	"calcParaBoundsForStages": {
    "Pre-editing": true,
    "Typesetter QA": true,
    "Author proof": true,
    "Author revision": true,
    "Revises": true,
    "Copyediting": true,
    "Copyediting Check": true,
    "Typesetter Check": true,
    "Publisher Check": true,
    "Author Review": true,
    "Publisher Review": true,
    "Author Revision": true
    },
    "pageSize":{
        "width":504,
        "height":720
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
	"watermark":{
        "Pre-editing":true, 
        "Typesetter QA":true, 
        "Author proof":true, 
        "Author revision":true, 
        "Revises":true,
        "Copyediting":true, 
        "Copyediting Check":true, 
        "Typesetter Check":true, 
        "Publisher Check":true, 
        "Author Review":true, 
        "Publisher Review":true, 
        "Author Revision":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[66,36,665,450
    ],
    "geoBoundsRecto":[66,558,665,972
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":414, "height":586,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":414, "height":599,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":66,
                "bottom":68,
                "inside":54,
                "outside":36
                },
            "otherPageMargin":{
                 "top":66,
                "bottom":55,
                "inside":54,
                "outside":36
                }
            },
        },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":'top'
        },
        "KEY_BACK":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":0,
            "preferredPlacement":null
        }
    },
    "landscape":{
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":283.5, 
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
      "position":"top",
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
        "continuedText":"Table [ID].[emsp](<i>Cont.</i>)",
        "space-below": 0,
        "repeat-header": true,
        "repeat-sub-header": false,
        "tableLastRowStyle": "TBLR",
        "tableHeadRowStyle": "TCH",
        "tableContinuedStyle": "TBL_ContHead",
        "tableLabelStyle": "tblLabel"
        }
    },
  "figure":{
      "footer": {
        "continuedText": " continued",
        "continuedTextStyle": "FIG_Cont",
        "figureBottomDefaultGap": 6
        },
      "header": {
        "continuedText":" continued",
        "spaceBelow": 6,
        "figureContinuedStyle": "FIG_ContHead"
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
          "Palatino LT Std": {
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
            {"fontFamily":"Minion Pro", "fontStyle":"Regular"},
            {"fontFamily":"Minion Pro", "fontStyle":"Italic"},
            {"fontFamily":"Minion Pro", "fontStyle":"Bold"},
            {"fontFamily":"Minion Pro", "fontStyle":"Bold Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Medium"},
            {"fontFamily":"Symbol", "fontStyle":"Italic"},
            {"fontFamily":"Symbol", "fontStyle":"Bold"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
          {"xpath" : "//div[@class='jrnlTRTR']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null}
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
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,10"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,15"
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
                    "colourValue":"0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"230,231,232"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"220,221,222"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            }
        },
        "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "9px",
                    "font-family" : "'Arial', Arial"
                },
                "fontPath"  : "Arial/ArialRegular.ttf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'ArialBold',ArialBold'",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 4px 4px 4px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Arial', Arial",
                    "font-size" : "9px",
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
                  "size" : "414"
              },
              "font" : {
                  "size"    : "11pt",
                  "ledding" : "15pt",
                  "path"    : "/PalatinoLTStd/",
                  "ext"     : "otf",
                  "bold"    : "PalatinoLTStd-Bold",
                  "italic"  : "PalatinoLTStd-Italic",
                  "bold_italic":"PalatinoLTStd-BoldItalic",
                  "main"    : "PalatinoLTStd-Roman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "414pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/Arial/",
                "ext"     : "ttf",
                    "bold"    : "ArialBold",
                  "italic"  : "ArialItalic",
                  "bold_italic":"ArialBoldItalic",
                  "main"    : "ArialRegular"
              }
           }
        },
    "stubColObj":{
        "top": {
            "STUB_COLUMN": false,
            "STUB_STMT": false
        },
        "bottom": {
            "METAINFO": true,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": true
        }
    }
}