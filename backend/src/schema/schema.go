package schema

import (
	"gorm.io/gorm"
)

type sortBy string

const (
	Stars   sortBy = "stars"
	Updated sortBy = "updated"
)

type Config struct {
	Profile        Profile            `json:"profile"`
	Gihub          Github             `json:"github"`
	Information    []Information      `json:"information"`
	Educations     []OtherInformation `json:"educations"`
	Experiences    []OtherInformation `json:"experiences"`
	Certifications []OtherInformation `json:"certifications"`
	Projects       []Project          `json:"projects"`
	Skills         []string           `json:"skills"`
}

type Profile struct {
	ID     uint    `jgorm:"primaryKey" json:"-"`
	Avatar string  `gorm:"type:varchar" json:"avatar"`
	Name   string  `gorm:"type:varchar" json:"name"`
	Bio    *string `gorm:"type:varchar" json:"bio"`
	Resume *string `gorm:"type:varchar" json:"resume"`
}

type Github struct {
	gorm.Model `json:"-"`
	Username   string  `gorm:"type:varchar" json:"username"`
	Display    bool    `json:"display"`
	SortBy     string  `json:"sortBy"`
	Limit      uint    `json:"limit"`
	Fork       bool    `json:"fork"`
	Exclude    *string `gorm:"type:varchar" json:"exclude"`
}

type Information struct {
	gorm.Model `json:"-"`
	Title      string  `gorm:"type:varchar" json:"title"`
	Value      string  `gorm:"type:varchar" json:"value"`
	Icon       string  `gorm:"type:varchar" json:"icon"`
	Link       *string `gorm:"type:varchar" json:"link"`
}

type OtherInformationCategory struct {
	ID   uint   `jgorm:"primaryKey" json:"-"`
	Name string `gorm:"type:varchar" json:"name"`
}

type OtherInformation struct {
	gorm.Model `json:"-"`
	CategoryID int                      `json:"categoryId"`
	Category   OtherInformationCategory `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;" json:"-"`
	From       string                   `gorm:"type:varchar" json:"from"`
	To         string                   `gorm:"type:varchar" json:"to"`
	Title      string                   `gorm:"type:varchar" json:"title"`
	Value      string                   `gorm:"type:varchar" json:"value"`
	Link       *string                  `gorm:"type:varchar" json:"link"`
}

type Project struct {
	gorm.Model  `json:"-"`
	Title       string `gorm:"type:varchar" json:"title"`
	Description string `gorm:"type:varchar" json:"description"`
	Image       string `gorm:"type:varchar" json:"image"`
	Link        string `gorm:"type:varchar" json:"link"`
}

type Skill struct {
	ID   uint   `jgorm:"primaryKey" json:"-"`
	Name string `gorm:"type:varchar" json:"name"`
}
