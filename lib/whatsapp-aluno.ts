export function whatsappAluno(telefone: string) {
 const digits = telefone.replace(/\D/g, '');
 const local = digits.startsWith('55') && (digits.length === 12 || digits.length === 13) ? digits.slice(2) : digits;
 if (!/^\d{10,11}$/.test(local)) return null;
 return 'https://wa.me/55' + local;
}
