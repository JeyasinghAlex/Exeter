var config = {
    "bookmarks":4,
    "pubIdentifier":"10.1136",
    "defaultUnits":"pt",
    "baseLeading":12,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "landscapeFloatOnFirstPage":false,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "minNoLinesOnPag":3,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":595.276,
        "height":793.701
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":true, 
            "bleed_marks":false, 
            "registration_marks":true, 
            "colour_bars":false, 
            "page_information":false,
            "offset":8.504
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
      "left":18.384,
      "right":18.384,
      "gutter":18.384
    },
    "geoBoundsVerso":[56.5,42,690.819915771484,553.275590551181
    ],
    "geoBoundsRecto":[56.5,637.275590551181,690.819915771484,1148.55118110236
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "EV":"LAYOUT1",
    "THANK":"LAYOUT2",
    "MISCELLANEOUS":"LAYOUT3"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
                "openerPageColumnDetails":[
                  {"width":196.737, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":196.737, "height":690.81,"floatsCited":false,"gutter":12.602}
                ],
                "columnDetails":[
                  {"width":246.446, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":246.446, "height":690.81,"floatsCited":false,"gutter":18.384}
                ],
                 "openerPageMargin":{
               "top":56.5,
                "bottom":46,
                "inside":147.2,
                "outside":42
                },
            "otherPageMargin":{
                "top":56.5,
                "bottom":46,
                "inside":42,
                "outside":42
                }
            },
         "LAYOUT2":{
            "openerPageColumnDetails":[
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":15}
                ],
                "columnDetails":[
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":0},
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":15},
                  {"width":116.569, "height":690.81,"floatsCited":false,"gutter":15}
                ],
             "openerPageMargin":{
               "top":56.5,
                "bottom":46,
                "inside":42,
                "outside":42
                },
            "otherPageMargin":{
                "top":56.5,
                "bottom":46,
                "inside":42,
                "outside":42
                }
             },
           "LAYOUT3":{
            "openerPageColumnDetails":[
                  {"width":374, "height":691.201,"floatsCited":false,"gutter":0}
                   ],
                "columnDetails":[
                  {"width":374, "height":691.201,"floatsCited":false,"gutter":0}
                  ],
             "openerPageMargin":{
               "top":60,
                "bottom":42.5,
                "inside":42,
                "outside":42
                },
            "otherPageMargin":{
                "top":56.5,
                "bottom":46,
                "inside":42,
                "outside":42
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
      "twoThirdWidth":342.8, 
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[80,85,90]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4,jrnlHead5",
        "limitationPercentage":[6,9,12]
        },
    "adjustFloatsSpace":{
        "limitationPercentage":{
            "minimum":[30,35,45],
            "maximum":[60,70,80]
            }        
    },
    "trackingLimit":{
        "minimum":15,
        "maximum":15
    },
    "nonDefaultLayers":["THANK"
    ],
    
    "docFontsList":[
       {
          "ITC New Baskerville": {
            "Roman": {
                "Symbol": "Medium"
              },
            "Italic": {
                "Symbol": "Italic"
              },
            "Bold": {
                "Symbol": "Bold"
              }
          }
      },
        {
          "Helvetica Neue LT Std (OTF)": {
            "55 Roman": {
                "ITC Zapf Dingbats": "Medium"
            }
          }
      },
        {
          "Myriad Pro": {
            "Regular": {
                "ITC Zapf Dingbats": "Medium"
              }
          }
        }
    ],
    
   "replFonts":[
            {"fontFamily":"ITC New Baskerville", "fontStyle":"Roman"},
            {"fontFamily":"Helvetica Neue LT Std", "fontStyle":"55 Roman"}
    ],    
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlRRH']", "frame-name":"RRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='front']//p[@pstyle='jrnlLRH']", "frame-name":"LRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCopyrightStmtInfo']", "frame-name":"COPYRIGHTSTMT_INFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null}
       ]       
     },
  "colorDetails":{
      "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"80,0,85,66"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"9,4,10,4"
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
                    "colourValue":"0,85,41"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"220,223,216"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
      "THANK":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"80,0,85,66"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"9,4,10,4"
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
                    "colourValue":"0,85,41"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"220,223,216"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
          "MISCELLANEOUS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"80,0,85,66"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"9,4,10,4"
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
                    "colourValue":"0,85,41"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"220,223,216"
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
                    "font-family" : "'Helvetica Neue LT Std', HelveticaNeueLTStd"
                }
            },
            "thead": {
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-75 Bold',HelveticaNeueLTStd-75Bold",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 0px 4px 4px",
                },
                 "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Bd.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-57 condensed',HelveticaNeueLTStd-57condensed",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Cn.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "511.276pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/ITCNewBaskervilleRoman/",
                     "ext"     : "ttf",
                  "bold"    : "ITCNewBaskervilleBold",
                  "italic"  : "ITCNewBaskervilleItalic",
                  "bold_italic":"ITCNewBaskervilleBoldItalic",
                  "main"    : "ITCNewBaskervilleRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "511.276pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "11pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                  "bold"    : "HelveticaNeueLTStd-Bd",
                  "italic"  : "HelveticaNeueLTStd-CnO",
                  "bold-italic":"HelveticaNeueLTStd-BdIt",
                  "main":"HelveticaNeueLTStd-Cn",
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
            "COPYRIGHTSTMT_INFO": false,
            "CROSSMARK": false,
            "RELATED_ARTICLE_INFO": false
        }
    }
}