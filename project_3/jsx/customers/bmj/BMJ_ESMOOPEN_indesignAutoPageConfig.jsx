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
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT","Correction"
    ],
    "floatTypeOnFirstPage":"KEY,KEY_BACK",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "figCaptionMinLines": 0,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "minNoLinesOnPag":3,
    "applyTableBorderColor":'WHITE',
    "pageSize":{
        "width":595.276,
        "height":793.701
    },
    "placeComBoxLib":{
        "jrnlAbsBoxedText":1667591796
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
      "left":14.852,
      "right":14.852,
      "gutter":14.852
    },
    "geoBoundsVerso":[49.5,40.5,740.200787401574,554.775590551181
    ],
    "geoBoundsRecto":[49.5,636.775590551181,740.200787401574,1148.85118110236
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "EV":"LAYOUT1",
    "MISCELLANEOUS":"LAYOUT2",
    "THANK":"LAYOUT4"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
                "openerPageColumnDetails":[
                  {"width":196.5, "height":690.70,"floatsCited":false,"gutter":0},
                  {"width":196.5, "height":690.70,"floatsCited":false,"gutter":14.852}
                ],
                "columnDetails":[
                  {"width":247.891, "height":690.70,"floatsCited":false,"gutter":0},
                  {"width":247.891, "height":690.70,"floatsCited":false,"gutter":18.494}
                ],
                 "openerPageMargin":{
                    "top":49.5,
                    "bottom":53.5,
                    "inside":146.92,
                    "outside":40.5
                },
            "otherPageMargin":{
                "top":49.5,
                "bottom":53.5,
                "inside":40.5,
                "outside":40.5
                }
            },
         "LAYOUT2":{
            "openerPageColumnDetails":[
                  {"width":407.851, "height":691.70,"floatsCited":false,"gutter":0}
                ],
                "columnDetails":[
                  {"width":407.851, "height":691.70,"floatsCited":false,"gutter":0}
                ],
                  "openerPageMargin":{
                "top":49.5,
                "bottom":53.5,
                "inside":146.92,
                "outside":40.5
                },
            "otherPageMargin":{
                "top":49.5,
                "bottom":53.5,
                "inside":146.92,
                "outside":146.92
                }
             },
         "LAYOUT4":{
            "openerPageColumnDetails":[
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":0},
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":14.852},
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":14.852},
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":14.852}
                ],
                "columnDetails":[
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":0},
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":14.852},
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":14.852},
                  {"width":117.411, "height":691.70,"floatsCited":false,"gutter":14.852}
                ],
                  "openerPageMargin":{
                "top":49.5,
                "bottom":53.5,
                "inside":40.5,
                "outside":40.5
                },
            "otherPageMargin":{
                "top":49.5,
                "bottom":53.5,
                "inside":40.5,
                "outside":40.5
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
            "calcCitationHeight":true,
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
                    "colourValue":"42,100,44,25"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"8,20,9,5"
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
                    "colourValue":"128,25,79"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"218,184,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        "EV":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"42,100,44,25"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"8,20,9,5"
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
                    "colourValue":"128,25,79"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"218,184,200"
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
                    "colourValue":"42,100,44,25"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"8,20,9,5"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"90,90,0,0"
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
                    "colourValue":"128,25,79"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"218,184,200"
                    },
                "COLOR3":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"65,64,153"
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
                    "colourValue":"42,100,44,25"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"8,20,9,5"
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
                    "colourValue":"128,25,79"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"218,184,200"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
        },
    "tableSetter" :{
            "table" : {
                "css" : {
                    "font-size" : "9px",
                    "font-family" : "'Helvetica Neue LT Std', HelveticaNeueLTStd-55 Roman"
                }
            },
            "thead": {
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-75 Bold',HelveticaNeueLTStd-75Bold",
                    "font-size" : "9px",
                    "line-height" : "10.8px",
                    "padding" : "4px 0px 4px 4px",
                },
                 "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Bd.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Helvetica Neue LT Std-55 Roman',HelveticaNeueLTStd-55Roman",
                    "font-size" : "9px",
                    "line-height" : "10.8px",
                    "padding" : "4px 0px 4px 4px",
                },
                "fontPath"  : "HelveticaNeueLTStd/HelveticaNeueLTStd-Roman_0.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "514.276 pt"
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
                  "size" : "514.276 pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "10.8pt",
                "path"    : "/HelveticaNeueLTStd/",
                "ext"     : "otf",
                  "bold"    : "HelveticaNeueLTStd-Bd",
                  "italic"  : "HelveticaNeueLTStd-It",
                  "bold-italic":"HelveticaNeueLTStd-BdIt",
                  "main":"HelveticaNeueLTStd-Roman_0",
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