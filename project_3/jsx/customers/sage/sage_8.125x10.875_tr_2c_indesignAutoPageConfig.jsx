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
    "minNoLinesOnPag":2,
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":'WHITE',
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
        "width":585,
        "height":783
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
        "cover":{
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
        "toc":{
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
        "Copyediting":true, 
        "Copyediting check":true, 
        "Typesetter check":true, 
        "Publisher check":true,
        "Author review":true, 
        "Publisher review":true, 
        "Typesetter review":true, 
        "Author revision":true
        },
    "wrapAroundFloat":{
      "top":28,
      "bottom":28,
      "left":12,
      "right":12,
      "gutter":0
    },
    "geoBoundsVerso":[71,37,728.5,551
    ],
    "geoBoundsRecto":[71,619,728.5,1133
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1",
    "DEFAULT":"LAYOUT1",
    "THOUGHTLET":"LAYOUT2",
    "ATTORS":"LAYOUT3"
	},
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                  {"width":251, "height":645.5,"floatsCited":false,"gutter":0},
                  {"width":251, "height":645.5,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":251, "height":657.5,"floatsCited":false,"gutter":0},
                  {"width":251, "height":657.5,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":71,
                "bottom":66.5,
                "inside":34,
                "outside":37
                },
            "otherPageMargin":{
                 "top":71,
                "bottom":54.5,
                "inside":34,
                "outside":37
                }
            },
        "LAYOUT2":{        
            "openerPageColumnDetails":[
                  {"width":251, "height":645.5,"floatsCited":false,"gutter":0},
                  {"width":251, "height":645.5,"floatsCited":false,"gutter":12}
                ],
                "columnDetails":[
                  {"width":251, "height":657.5,"floatsCited":false,"gutter":0},
                  {"width":251, "height":657.5,"floatsCited":false,"gutter":12}
                ],
                "openerPageMargin":{
                 "top":71,
                "bottom":66.5,
                "inside":34,
                "outside":37
                },
            "otherPageMargin":{
                 "top":71,
                "bottom":54.5,
                "inside":34,
                "outside":37
                }
            },
         "LAYOUT3":{        
            "openerPageColumnDetails":[
                  {"width":163.333, "height":645.5,"floatsCited":false,"gutter":0},
                  {"width":163.333, "height":645.5,"floatsCited":false,"gutter":12},
                  {"width":163.333, "height":645.5,"floatsCited":false,"gutter":12},
                ],
                "columnDetails":[
                  {"width":163.333, "height":657.5,"floatsCited":false,"gutter":0},
                  {"width":163.333, "height":657.5,"floatsCited":false,"gutter":12},
                  {"width":163.333, "height":645.5,"floatsCited":false,"gutter":12},
                ],
                "openerPageMargin":{
                 "top":71,
                "bottom":66.5,
                "inside":34,
                "outside":37
                },
            "otherPageMargin":{
                 "top":71,
                "bottom":54.5,
                "inside":34,
                "outside":37
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
      "singleColumnStyle":false,
      "twoThirdColumnStyle":false,
      "twoThirdWidth":340.85, 
      "horizontalCenter":true
    },
      "resizeImage":{
      "allow":false,
      "modifyLimit":0,
      "floatImageBorder":{
          "insetValue":6,
          "extendToColumnWidth":true 
          },
	  "skipInlineConvertedFloatImageBorder":true
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
        "continuedText":"Table [ID].[emsp](<i>Continued</i>)",
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
        "repeatLabel":false,
        "continuedText": "(continued)",
        "continuedTextStyle": "FIG_Cont",
        "figureBottomDefaultGap": 8
        },
      "header": {
        "repeatLabel":true,
        "continuedText":" Continued",
        "spaceBelow": 8,
        "figureContinuedStyle": "FIG_ContHead"
            }
        }
      },
    "adjustParagraphSpaceStyleList":{
        "increase":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlHead4,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-B"
         },
        "decrease":{
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlHead4,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T,EQN-O,EQN-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B,EQN-O,EQN-B"
         },
        "limitationPercentage":{
            "minimum":[40,45,50],
            "maximum":[60,70,80]
            }
    },
    "detailsForVJ":{
        "VJallowed":true,
        "stylesExcludedForVJ":"jrnlAuthors,jrnlArtTitle,jrnlArtType,jrnlAbsHead,jrnlHead1,jrnlHead2,jrnlHead3,jrnlHead4",
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
    "nonDefaultLayers":["PRIM_SUR"
    ],        
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlStubBlock']", "frame-name":"STUB_COLUMN", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTRTL']", "frame-name":"TRTL", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlTVTR']", "frame-name":"TVTR", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlMetaInfo']", "frame-name":"METAINFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlRelatedInfo']", "frame-name":"RELATED_ARTICLE_INFO", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlLicenseStmt']", "frame-name":"LICENCE_STMT", "action":"move", "styleOverride":null}
       ]       
     },
    "colorDetails":{
        "undefined":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
            "DEFAULT":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
			"THOUGHTLET":{
             "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"0,0,0"
                    },
                "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,255"
                    }
                }            
            },
         "ATTORS":{
            "print":{
                "COLOR1":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
                    },
                "COLOR2":{
                    "colourType":"process",
                    "colourMode":"CMYK",
                    "colourValue":"0,0,0,0"
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
                    "colourValue":"0,0,0"
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
                    "font-family" : "'GillSans', GillSans "
                },
                "fontPath"  : "GillSans/GillSans.otf"
            },
            "thead": {
                "css" : {
                    "font-family" : "'GillSans',GillSans",
                    "font-size" : "9px",
                    "line-height" : "10.5px",
                    "padding" : "4px 0px 4px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'GillSans', GillSans",
                    "font-size" : "9px",
                    "line-height" : "10.5px",
                    "padding" : "3px 0px 3px 0px",
                },
                "align" : "left",
                "valign": "bottom"
            }
        },
     "equation" : {
          "default" : {
              "page":{
                  "size" : "251pt"
              },
              "font" : {
                  "size"    : "10pt",
                  "ledding" : "12pt",
                  "path"    : "/TimesNewRoman/",
                  "ext"     : "ttf",
                  "bold"    : "TimesNewRoman-Bold",
                  "italic"  : "TimesNewRoman-Italic",
                  "bold_italic":"TimesNewRoman-BoldItalic",
                  "main"    : "TimesNewRoman"
              }
           },
           "jrnlTblBlock" : {
              "page":{
                  "size" : "251pt"
              },
              "font" : {
                "size"    : "9pt",
                "ledding" : "10.5pt",
                "path"    : "/Garamond/",
                "ext"     : "otf",
                  "bold"    : "Garamond-Bold",
                  "italic"  : "Garamond-Italic",
                  "bold-italic":"Garamond-BoldItalic",
                  "main":"Garamond",
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
            "RELATED_ARTICLE_INFO": true
        }
    },
	"tocDetails":{
       "tocAdjustParagraphSpaceStyleList":{
            "increase":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "decrease":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "softBreak":["jrnlArtTitle"],                
            "limitationPercentage":{
                "minimum":40,
                "maximum":80
            },
            "pointSizeModify":{                
                "maximum":0.5
            }
        },
       "fontFamily":{
            "TimesNewRoman":{
                "Regular":{  
                "roman":"Regular",
                "bold":"Bold",
                "italic":"Italic",
                "bolditalic":"Bold Italic"
                },
                "Italic":{
                "roman":"Italic",
                "bold":"Bold Italic",
                "italic":"Italic",
                "bolditalic":"Bold Italic" 
                },
                "Bold":{
                "roman":"Bold",
                "bold":"Bold",
                "italic":"Bold Italic",
                "bolditalic":"Bold Italic" 
                },
                "BoldItalic":{
                "roman":"Bold Italic",
                "bold":"Bold Italic",
                "italic":"Bold Italic",
                "bolditalic":"Bold Italic" 
                } 
            }
        }
    }
}
