var config = {
    "bookmarks":3,
    "defaultUnits":"pt",
    "baseLeading":12,
    "preferredPlaceColumn":0,
    "baseAlignmentItterationLimit":3,
    "floatLandscape":false,
    "floatOnFirstPageForDefaultLayout":true,
    "articleTypeNotFloatsOnFirstPage":["undefined","DEFAULT"
    ],
    "floatTypeOnFirstPage":"KEY",
    "minStackSpace":18,
    "placeStyle":"Sandwich",
    "applyTableLeftRightBorder":true,
    "applyTableBorderWidth":0.15,
    "applyTableBorderColor":"WHITE",
    "pageSize":{
        "width":442.205,
        "height":663.307
    },
    "exportPDFpreset":{
        "print":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            },
        "online":{
            "crop_marks":false, 
            "bleed_marks":false, 
            "registration_marks":false, 
            "colour_bars":false, 
            "page_information":false,
            "offset":0
            },
         "cover":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "toc":{
            "print":"BMJ_cover-Print",
            "online":"BMJ_cover-Online"
            },
        "advert":{
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
            }
        },        
    "wrapAroundFloat":{
      "top":18,
      "bottom":18,
      "left":12.5,
      "right":12.5,
      "gutter":12.5
    },
    "geoBoundsVerso":[66.5,60.0000000000001,603.307086614172,382.204669291339
    ],
    "geoBoundsRecto":[66.5,502.204724409449,603.307086614173,824.409448818898
    ],
    "articleTypeDetails":{
    "undefined":"LAYOUT1"
    },
    "pageColumnDetails":{
        "LAYOUT1":{        
            "openerPageColumnDetails":[
                 {"width":322.205, "height":496.807,"floatsCited":false,"gutter":0}
              
                ],
                "columnDetails":[
                  {"width":322.205, "height":536.807,"floatsCited":false,"gutter":0}
             
                ],
                "openerPageMargin":{
					"top":106.5,
					"bottom":60,
					"inside":60,
					"outside":60
                },
				"otherPageMargin":{
					"top":66.5,
					"bottom":60,
					"inside":60,
					"outside":60
                }
            }
         },
    "jrnlBoxBlock":{
        "KEY":{
            "calcCitationHeight":false,
            "preferredOnCurrentPage":true,
            "preferredOnColumn":1,
            "preferredPlacement":"top"
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
        "continuedText": "(<i>Continued</i>)",
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
   "box":{
      "header": {
        "continuedText":"Continued.",
        "spaceBelow": 12,
        "boxContinuedStyle": "BOX_ContHead"
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
            "before":"jrnlHead1,jrnlHead1_First,jrnlHead2,jrnlHead3,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
         },
        "decrease":{
            "before":"jrnlHead1_First,jrnlHead1,jrnlHead2,jrnlRefHead,BL-T,NL-T,BL-O,NL-O,QUOTE-T",
            "after":"BL-B,NL-B,BL-O,NL-O,QUOTE-O,QUOTE-B"
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
    
    "assignUsingXpath": {
       "toFrames":[
         {"xpath" : "//div[@class='jrnlSTRH']", "frame-name":"STRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlALH']", "frame-name":"ALH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCRRH']", "frame-name":"CRRH", "action":"move", "styleOverride":null},
         {"xpath" : "//div[@class='jrnlCLRH']", "frame-name":"CLRH", "action":"move", "styleOverride":null}
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
                    "colourValue":"220,221,222"
                    },
                 "HYPERLINK":{
                    "colourType":"process",
                    "colourMode":"RGB",
                    "colourValue":"0,0,0"
                    }
                }            
            }
        },
    "tableSetter" :{
            "thead": {
                "css" : {
                    "font-family" : "'Optima LT Std', OptimaLTStd",
                    "font-size" : "9px",
                    "line-height" : "11px",
                    "padding" : "0px 4px 0px 4px"
                },
                 "fontPath"  : "OptimaLTStd/OptimaLTStd-Bold.otf",
                "align" : "left",
                "valign": "bottom"
            },
            "tbody":{
                "css" : {
                    "font-family" : "'Optima LT Std', OptimaLTStd",
                    "font-size" : "9px",
                    "line-height"  : "11px",
                    "padding" : "0px 4px 0px 4px"
                },
                 "fontPath"  : "OptimaLTStd/OptimaLTStd.otf",
                "align" : "left",
                "valign": "bottom"
            }
        },
    "equation" : {
          "default" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                  "size"    : "9pt",
                  "ledding" : "11pt",
                  "path"    : "/PhotinaMTStd/",
                  "ext"     : "otf",
                  "bold"    : "PhotinaMTStd-Bold",
                  "italic"  : "PhotinaMTStd-Italic",
                  "bold_italic":"PhotinaMTStd-BoldItalic",
                  "main"    : "PhotinaMTStd-Roman"
              }
           },
          "jrnlAbsPara" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
					"size"    : "9pt",
					"ledding" : "11pt",
					"path"    : "/PhotinaMTStd/",
					"ext"     : "otf",
					"bold"    : "PhotinaMTStd-Bold",
					"italic"  : "PhotinaMTStd-Italic",
					"bold_italic":"PhotinaMTStd-BoldItalic",
					"main"    : "PhotinaMTStd-Roman"
              }
          },
           "jrnlAbsGroup" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
					"size"    : "9pt",
					"ledding" : "11pt",
					"path"    : "/PhotinaMTStd/",
					"ext"     : "otf",
					"bold"    : "PhotinaMTStd-Bold",
					"italic"  : "PhotinaMTStd-Italic",
					"bold_italic":"PhotinaMTStd-BoldItalic",
					"main"    : "PhotinaMTStd-Roman"
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
          },
           "jrnlFigCaption" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
				"size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              },
              "online" : {
                "textColor"    : "88, 89, 91"
              },
              "print" : {
                "textColor"    : "0,0,0,0.8"
              }
           },
           "jrnlHead1" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "10pt",
				"ledding" : "12pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              }
          },
          "jrnlHead2" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "10pt",
				"ledding" : "12pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              }
          },
           "jrnlHead3" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "10pt",
				"ledding" : "12pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              }
          },
       "jrnlHead4" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              }
          },
           "jrnlTblCaption" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,100"
              }
           },
           "jrnlTblFoot" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "8pt",
				"ledding" : "10pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,100"
              }
           },
           "jrnlTblHead" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,100"
              }
          },
           "jrnlTblBody" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              }
         },
           "txtCiteInfo" : {
              "page":{
                  "size" : "322.205pt"
              },
              "font" : {
                "size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              },
              "online" : {
                "textColor"    : "0, 0, 0"
              },
              "print" : {
                "textColor"    : "0,0,0,100"
              }
          },
           "jrnlArtTitle" : {
              "page":{
                  "size" : "372pt"
              },
              "font" : {
                "size"    : "14pt",
				"ledding" : "16pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
              }
          },
         "jrnlTblBlock" : {
            "page":{
                "size" : "322.205pt"
            },
            "font" : {
              "size"    : "9pt",
				"ledding" : "11pt",
				"path"    : "/OptimaLTStd/",
				"ext"     : "otf",
				"bold"    : "OptimaLTStd-Bold",
				"italic"  : "OptimaLTStd-Italic",
				"bold_italic":"OptimaLTStd-BoldItalic",
				"main"  : "OptimaLTStd"
            }
         }
    },
 "runOnSectionsOrArticles":[
        {"xpath":"//div[@class='jrnlRefBlock']",
            "continueType":"samePage",
            "spaceAbove":18,
            "firstbaselineOffset":1296852079,
            "rule":{"width":"0.5","offset":"15","showOnPageTop":"false"},
            "columnDetails":{        
                "openerPageColumnDetails":[
                        {"width":322.205, "height":496.807,"floatsCited":false,"gutter":0}
                      ],
                    "columnDetails":[
                        {"width":322.205, "height":536.807,"floatsCited":false,"gutter":0}
                    ],
                "openerPageMargin":{
					"top":106.5,
					"bottom":60,
					"inside":60,
					"outside":60
                },
				"otherPageMargin":{
					"top":66.5,
					"bottom":60,
					"inside":60,
					"outside":60
                    }
                }
            },
        {"xpath":"//div[@class='jrnlRefGroup']",
            "continueType":"samePage",
            "spaceAbove":18,
            "firstbaselineOffset":1296852079,
            "rule":{"width":"0.5","offset":"15","showOnPageTop":"false"},
            "columnDetails":{        
                "openerPageColumnDetails":[
                        {"width":322.205, "height":496.807,"floatsCited":false,"gutter":0}
                      ],
                    "columnDetails":[
                        {"width":322.205, "height":536.807,"floatsCited":false,"gutter":0}
                    ],
                "openerPageMargin":{
					"top":106.5,
					"bottom":60,
					"inside":60,
					"outside":60
                },
				"otherPageMargin":{
					"top":66.5,
					"bottom":60,
					"inside":60,
					"outside":60
                    }
                }
            },
        {"xpath":"//div[@class='jrnlAppBlock1']",
            "continueType":"samePage",
            "spaceAbove":30,
            "firstbaselineOffset":1296135023,
            "columnDetails":{        
                "openerPageColumnDetails":[
                       {"width":322.205, "height":496.807,"floatsCited":false,"gutter":0}
                      ],
                    "columnDetails":[
                       {"width":322.205, "height":536.807,"floatsCited":false,"gutter":0}
                    ],
				"openerPageMargin":{
					"top":106.5,
					"bottom":60,
					"inside":60,
					"outside":60
                },
				"otherPageMargin":{
					"top":66.5,
					"bottom":60,
					"inside":60,
					"outside":60
                    }
                }
            }
        ],
       "tocDetails":{   
       "singlePageToc": false,
       "maximumTocFrameHeight":536.807,
       "backGroundColor":true,
        "tocAdjustParagraphSpaceStyleList":{
            "increase":{
                "before":"jrnlArticleType",
                "after":"jrnlAuthors"
            },
            "softBreak":["jrnlArtTitle"],                
            "limitationPercentage":{
                "minimum":40,
                "maximum":60
            },
            "pointSizeModify":{                
                "maximum":0.5
            }
        },
       "fontFamily":{
           "PhotinaMTStd":{  
              "Regular":{  
                 "roman":"Regular",
                 "bold":"Bold",
                 "italic":"Italic",
                 "bolditalic":"Bold Italic"
              },
              "Bold":{  
                 "italic":"Bold Italic",
                 "bolditalic":"Bold Italic"
              },
              "Italic":{  
                 "bold":"Bold Italic",
                 "bolditalic":"Bold Italic"
              },
              "BoldItalic":{  
                 "italic":"Bold Italic",
                 "bolditalic":"Bold Italic"
              }
           }
        }
    }
}