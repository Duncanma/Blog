# {{ .Title }}

{{- $pages := where .Pages "Params.hidden" "ne" true }}
{{- range $pages.GroupByDate "2006" }}

## {{ .Key }}

{{- range .Pages }}
- [{{.Title}}]({{.RelPermalink}}index.md)
{{- end }}

{{- end }}