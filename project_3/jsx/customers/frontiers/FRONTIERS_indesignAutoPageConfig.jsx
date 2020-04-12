var config = {
    "defaultUnits":"pt",
    "bookmarks":4,
    "pubIdentifier":"10.3389", 
    "baseLeading":11.5,
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
    "applyTableLeftRightBorder":false,
    "SupplRef":true,
     "pageSize":{
             "width":595.276,
            "height":779.528
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
"geoBoundsVerso":[62.3,45.3,713.21,549.975590551
    ],
    "geoBoundsRecto":[62.3,640.575590551,713.21,1145.251590551
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1"
    },    
    
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":374.172 , "height":587,"floatsCited":false,"gutter":0}
                 ],
                "columnDetails":[
                  {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                  {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                ],
                "openerPageMargin":{
                 "top":126.5,
                "bottom":66.318,
                "inside":175.75,
                "outside":45.3
                },
            "otherPageMargin":{
                 "top":62.3,
                "bottom":66.318,
                "inside":45.3,
                "outside":45.3
                }
            }
        },
    "jrnlBoxBlock":{//these objects are for overriding actual floats placement 
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
      "singleColumnStyle":true,//if this is true then the landscape float could be placed in landscape single column
      "twoThirdColumnStyle":false,//if this is true then the landscape float could be placed in landscape two third column
      "twoThirdWidth":340.85, 
      "horizontalCenter":true//if this is true float could be center horizontally after rotated
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
        "continuedText": "(<i>Continued</i>)",
        "continuedTextStyle": "TBL_Cont",
        "tableBottomDefaultGap": 6
      },
      "header": {
//~         "continuedText":"Table [ID]. [CAPTION][ensp](<i>Continued</i>)",
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,jrnlFundingHead,jrnlEqualContribFNHead,BL-T,NL-T,BL-O,NL-O,EQN-O,EQN-T,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,EQN-O,EQN-B,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,EQN-O,EQN-T,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,EQN-O,EQN-B,QUOTE-B"
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
         {"xpath" : "//p[@pstyle='jrnlSTRH']", "frame-name":"jrnlSTRH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlSTLH']", "frame-name":"jrnlSTLH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlARH']", "frame-name":"jrnlARH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlJVH']", "frame-name":"jrnlJVH", "action":"move", "styleOverride":null},
         {"xpath" : "//p[@pstyle='jrnlJT']", "frame-name":"jrnlJT", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlTVTL']", "frame-name":"TVTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTR']", "frame-name":"TRTR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlTVBL']", "frame-name":"TVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVBR']", "frame-name":"TVBR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlTRBL']", "frame-name":"TRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRBR']", "frame-name":"TRBR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlCVBL']", "frame-name":"CVBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCVBR']", "frame-name":"CVBR", "action":"move", "styleOverride":null},
          {"xpath" : "//div[@class='jrnlCRBL']", "frame-name":"CRBL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRBR']", "frame-name":"CRBR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlDefBlock']", "frame-name":"ABBREVATION", "action":"move", "styleOverride":null}
         ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    }
                },
            "online":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,70"
                    }
                }            
            }
        },
        "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "7px",
                    "font-family" : "'Helvetica Neue LT Std', serif"
                },
                "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'HelveticaNeueLTStd-67BoldCondensed', serif",
                    "font-weight"    : "normal",
                    "line-height"    : "normal",
                    "padding" : "5.669px 2.5px 5.669px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-weight"    : "normal",
                    "line-height"    : "normal",
                    "padding" : "2.5px 2.5px 2px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "charAlignCenter" : true
        },
        "equation" : {
          "default" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                  "size"    : "9.5pt",
                  "ledding" : "11.5pt",
                  "path"    : "/MinionPro/",
                  "ext"     : "otf",
                  "bold"    : "MinionProBold",
                  "italic"  : "MinionProItalic",
                  "bold_italic":"MinionProBoldItalic",
                  "main"    : "MinionProRegular"
              }
           },
       "jrnlFigCaption" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9.5pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaNeueLTStd-Bd",
                "italic"  : "HelveticaNeueLTStd-LtIt",
                "bold_italic":"HelveticaNeueLTStd-BdIt",
                "main"    : "HelveticaNeueLTStd-Lt"
              }
          },
      "jrnlTblCaption" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9.5pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaNeueLTStd-Bd",
                "italic"  : "HelveticaNeueLTStd-LtIt",
                "bold_italic":"HelveticaNeueLTStd-BdIt",
                "main"    : "HelveticaNeueLTStd-Lt"
              }
          },
      "jrnlTblHead" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9.5pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaNeueLTStd-Bd",
                "italic"  : "HelveticaNeueLTStd-LtIt",
                "bold_italic":"HelveticaNeueLTStd-BdIt",
                "main"    : "HelveticaNeueLTStd-Bd"
              }
          },
       "jrnlTblBody" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9.5pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaNeueLTStd-Bd",
                "italic"  : "HelveticaNeueLTStd-LtIt",
                "bold_italic":"HelveticaNeueLTStd-BdIt",
                "main"    : "HelveticaNeueLTStd-Lt"
              }
          },
       "jrnlTblFoot" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                "size"    : "6.5pt",
                "ledding" : "9pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaNeueLTStd-Bd",
                "italic"  : "HelveticaNeueLTStd-LtIt",
                "bold_italic":"HelveticaNeueLTStd-BdIt",
                "main"    : "HelveticaNeueLTStd-LtIt"
              }
          },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "504.676pt"
              },
              "font" : {
                "size"    : "7pt",
                "ledding" : "9.5pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                "bold"    : "HelveticaNeueLTStd-Bd",
                "italic"  : "HelveticaNeueLTStd-LtIt",
                "bold_italic":"HelveticaNeueLTStd-BdIt",
                "main"    : "HelveticaNeueLTStd-Lt"
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
	"floatRuleSeparator":{//this object will be considered when a rule separator is required 
        "jrnlTblBlock":{
            "fromBottom":{
                "weight":0.25,
                "offset":11.5,
                "color":"COLOR1",
                "frameIndent":0,
                "adjustLastRowPaddingAndRule": true,
                "bottomPaddingForCell":0
                }
            }
    },
    "tableCellBorder":{
        "colour":"COLOR1",
        "weight":0.15,
        "strokeType":"Solid"
        },
    "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlRefGroup']",
            "continueType":"samePage",
            "spaceAbove":30,
            "firstbaselineOffset":1296852079,
            "rule":{"width":"0.5","offset":"15","showOnPageTop":"false"},
            "columnDetails":{
            "openerPageColumnDetails":[
                  {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                  {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                    ],
                "columnDetails":[
                  {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                  {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                    ],
                "openerPageMargin":{
                 "top":126.5,
                "bottom":66.318,
                "inside":175.75,
                "outside":45.3
                },
            "otherPageMargin":{
                 "top":62.3,
                "bottom":66.318,
                "inside":45.3,
                "outside":45.3
                }
            }
        },
        {"xpath":"//div[@class='jrnlAppGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                        ],
                    "columnDetails":[
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                        ],
                "openerPageMargin":{
                 "top":126.5,
                "bottom":66.318,
                "inside":175.75,
                "outside":45.3
                },
            "otherPageMargin":{
                 "top":62.3,
                "bottom":66.318,
                "inside":45.3,
                "outside":45.3
                }
            }
        },
    {"xpath":"//div[@class='jrnlGlossaryGroup']",
            "continueType":"freshPage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                        ],
                    "columnDetails":[
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":0},
                      {"width":245.251 , "height":650.91,"floatsCited":false,"gutter":14.173}
                        ],
                "openerPageMargin":{
                 "top":126.5,
                "bottom":66.318,
                "inside":175.75,
                "outside":45.3
                },
            "otherPageMargin":{
                 "top":62.3,
                "bottom":66.318,
                "inside":45.3,
                "outside":45.3
                }
            }
        }
    ]
}