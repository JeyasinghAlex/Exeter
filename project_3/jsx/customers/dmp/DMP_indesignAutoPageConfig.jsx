  var config = {
    "defaultUnits":"pt",
    "bookmarks":4,
    "pubIdentifier":"10.3389", 
    "baseLeading":14,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "pageCountDetails":"Rounded",
    "floatOnFirstPageForDefaultLayout":true,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"],
    "floatTypeOnFirstPage":"KEY",    
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":false,   
     "pageSize":{
             "width":612,
            "height":792
        },
    "placeOnlineBox":{
    "defaultPlaceBottom":'true'
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":true, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":18.5
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            }
        },
    "watermark":{
        "Pre-editing":true, 
        "Copyediting":true, 
        "Copyediting Check":true, 
        "Typesetter Check":true, 
        "Publisher Check":true, 
        "Author Review":true, 
        "Publisher Review":true, 
        "Typesetter Review":true
        },
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12,
      "right":12,
      "gutter":14.173
    },
    "geoBoundsVerso":[53.85,53.85,726.8,541.15
    ],
    "geoBoundsRecto":[53.85,682.85,726.8,1170.15
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "RETRACTION":"LAYOUT2"
    },    
    
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":337, "height":477.142,"floatsCited":false,"gutter":0}
                 ],
                "columnDetails":[
                  {"width":236.575, "height":672.95,"floatsCited":false,"gutter":0},
                  {"width":236.575, "height":672.95,"floatsCited":false,"gutter":14.15}
                ],
                "openerPageMargin":{
                 "top":101.1,
                "bottom":65.2,
                "inside":221.15,
                "outside":53.85
                },
            "otherPageMargin":{
                 "top":53.85,
                "bottom":65.2,
                "inside":70.85,
                "outside":53.85
                }
            },
        "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":236.575, "height":625.7,"floatsCited":false,"gutter":0},
                  {"width":236.575, "height":625.7,"floatsCited":false,"gutter":12}
                 ],
                "columnDetails":[
                  {"width":236.575, "height":672.95,"floatsCited":false,"gutter":0},
                  {"width":236.575, "height":672.95,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":101.1,
                "bottom":65.2,
                "inside":70.85,
                "outside":53.85
                },
            "otherPageMargin":{
                 "top":53.85,
                "bottom":65.2,
                "inside":70.85,
                "outside":53.85
                }
            }
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
      "singleColumnStyle":true,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":365.475, 
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5,jrnlRefHead,jrnlFundingHead,jrnlEqualContribFNHead,BL-T,NL-T,BL-O,NL-O,EQN-O,EQN-T,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,EQN-O,EQN-B,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5,jrnlRefHead,jrnlFundingHead,jrnlEqualContribFNHead,BL-T,NL-T,BL-O,NL-O,EQN-O,EQN-T,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,EQN-O,EQN-B,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlArtTitle,jrnlArtType",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[80,85,90]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["PRIM_SUR"],
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlSTRH']", "frame-name":"STRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBL']", "frame-name":"TRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVBR']", "frame-name":"TVBR", "action":"move", "styleOverride":null},
        {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
        {"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
        {"xpath" : "//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
        {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVTL']", "frame-name":"CVTL", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlDefBlock']", "frame-name":"ABBREVATION", "action":"move", "styleOverride":null}
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
                    "colourValue":"0,0,0"
                    }
                }            
            },
        "RETRACTION":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,100"
                    },
                "COLOR2":{
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
                    "colourValue":"0,0,0"
                    }
                }            
            }
        },
            "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "8pt",
                    "font-family" : "'GillSansMT', GillSansMT"
                },
                "fontPath"  : "GillSansMT/GillSansMT.ttf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'GillSansMT-Bold',GillSansMT-Bold",
                    "font-size" : "8pt",
                    "line-height" : "11pt",
                    "padding" : "0.5px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'GillSansMT',GillSansMT",
                    "font-size" : "8pt",
                    "line-height" : "11pt",
                   "padding" : "0px 0px 0.5px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "612pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "14pt",
                  "path"    : "/TimesNewRomanPS/",
                     "ext"     : "ttf",
                  "bold"    : "TimesNewRomanPS-Bold",
                  "italic"  : "TimesNewRomanPS-Italic",
                  "bold_italic":"TimesNewRomanPS-BoldItalic",
                  "main"    : "TimesNewRomanPS"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "612pt"
              },
              "font" : {
                "size"    : "8pt",
                "ledding" : "11pt",
                "path"    : "/Goudy/",
                "ext"     : "ttf",
                  "bold"    : "GillSansMT-Bold",
                  "italic"  : "GillSansMT-Italic",
                  "bold_italic":"GillSansMT-BoldItalic",
                  "main"    : "GillSansMT"
              }
           }
        },
    "relinkFigures":['LOGO_1.eps'],
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
    },
"runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlSupplGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                  {"width":236.575, "height":125,"floatsCited":false,"gutter":0}
                    ],
                    "columnDetails":[
                  {"width":236.575 , "height":125,"floatsCited":false,"gutter":0}
                    ],
                "openerPageMargin":{
                 "top":53.85,
                "bottom":65.2,
                "inside":70.85,
                "outside":53.85
                },
            "otherPageMargin":{
                 "top":53.85,
                "bottom":65.2,
                "inside":70.85,
                "outside":53.85
                }
            }
        }
    ]
}