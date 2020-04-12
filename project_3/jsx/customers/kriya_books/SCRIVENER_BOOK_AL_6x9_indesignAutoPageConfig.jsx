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
    "geoBoundsVerso":[72,54,602,378
    ],
    "geoBoundsRecto":[72,486,602,810
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":324, "height":457.5,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":324, "height":528.5,"floatsCited":false,"gutter":0}
                ],
                "openerPageMargin":{
                 "top":143,
                "bottom":47.5,
                "inside":54,
                "outside":54
                },
            "otherPageMargin":{
                 "top":72,
                "bottom":47.5,
                "inside":54,
                "outside":54
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
          {"xpath" : "//p[@pstyle='jrnlLRH']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
          {"xpath" : "//p[@pstyle='jrnlRRH']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
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
            }
        },
        "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "11px",
                    "font-family" : "'MinionPro', MinionPro"
                },
                "fontPath"  : "MinionPro/MinionPro.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'MinionProBold',MinionProBold'",
                    "font-size" : "11px",
                    "line-height" : "13px",
                    "padding" : "6px 6px 6px 6px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'MinionProRegular', MinionProRegular",
                    "font-size" : "11px",
                    "line-height" : "13px",
                    "padding" : "6px 6px 6px 6px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "324pt"
              },
              "font" : {
                  "size"    : "13pt",
                  "ledding" : "15pt",
                  "path"    : "/MinionPro/",
                  "ext"     : "otf",
                  "bold"    : "MinionProBold",
                  "italic"  : "MinionProItalic",
                  "bold_italic":"MinionProBoldItalic",
                  "main"    : "MinionProRegular"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "324pt"
              },
              "font" : {
                "size"    : "11pt",
                "ledding" : "13pt",
                "path"    : "/MinionPro/",
                "ext"     : "otf",
                    "bold"    : "MinionProBold",
                  "italic"  : "MinionProItalic",
                  "bold_italic":"MinionProBoldItalic",
                  "main"    : "MinionProRegular"
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