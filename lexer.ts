const lexicalRules = [
    { type: "left_paren", regex: /(\(|\[|\{)/y },
    { type: "right_paren", regex: /(\)|\]\}])/y },
    { type: "quatation_mark", regex: /'/y },
    { type: "number", regex: /\d+(\.\d+)?/y },
    { type: "string", regex: /"([^"\\]|\\.)*"/y },
    { type: "identifier", regex: /\S+/y }
] as const

type TokenType = (typeof lexicalRules)[number]["type"]

type Token = { type: TokenType, text: string }

export function* createTokenStream(source: string) {
    let index = 0
    while (index != source.length) {
        if (/\s/.test(source[index])) {
            ++index
            continue
        }

        let matched = false;
        for (const rule of lexicalRules) {
            rule.regex.lastIndex = index
            const res = rule.regex.exec(source)
            if (res) {
                index = rule.regex.lastIndex
                yield { type: rule.type, text: res[0] }
                matched = true
                break
            }
        }
        if (!matched) {
            throw new Error(`Unexpected token at ${index}`)
        }
    }
}