import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from myRevendeurApp.config import baseUrl
from myRevendeurApp.models import QuantityInStock
from myManageSale.models import ProductSale
from myManageSale.serializers import ProductSaleSerializer
from myRevendeurApp.serializers import QuantityInStockSerializer
from myCost.views import AddCost
from myGain.views import AddGain
from django.views.decorators.http import require_http_methods
from django.http import Http404
import json


class UpdateSale():
    # Mise à jour du sale et du discount du produit en fonction de l'id et de la quantité   
    def update(self,prod,response,id):
        #En fonction de la condition on met à jour la valeur du sale et du discount depuis la table myManageSale.productsale
        #retourne le produit json avec les valeurs discount et sale de la bdd  
        if prod.quantity < 16:
            ProductSale.objects.filter(tigId=id).update(sale=False,discount=0.0)
            new_prod_in_manage_sale = ProductSale.objects.get(tigId=id)
            serializer = ProductSaleSerializer(new_prod_in_manage_sale)
            response['sale'] = serializer.data['sale']
            response['discount'] = serializer.data['discount']
            return response
        elif 16 <= prod.quantity <= 64:
            new_price = round(response['price'] * 0.8,2)
            ProductSale.objects.filter(tigId=id).update(sale=True,discount=new_price)
            new_prod_in_manage_sale = ProductSale.objects.get(tigId=id)
            serializer = ProductSaleSerializer(new_prod_in_manage_sale)
            response['sale'] = serializer.data['sale']
            response['discount'] = serializer.data['discount']
            return response
        else:
            new_price = round(response['price'] * 0.5,2)
            ProductSale.objects.filter(tigId=id).update(sale=True,discount=new_price)
            new_prod_in_manage_sale = ProductSale.objects.get(tigId=id)
            serializer = ProductSaleSerializer(new_prod_in_manage_sale)
            response['sale'] = serializer.data['sale']
            response['discount'] = serializer.data['discount']
            return response


class InfoStockProducts(APIView):
     def get(self, request, format=None):
        res=[]
        for prod in QuantityInStock.objects.all():
            serializer = QuantityInStockSerializer(prod)
            response = requests.get(baseUrl+'product/'+str(serializer.data['tigId'])+'/')
            jsondata = response.json()
            res.append(jsondata)
        return Response(res)

class InfoStockProductDetail(APIView):
    def get_object(self, pk):
        try:
            return QuantityInStock.objects.get(pk=pk)
        except QuantityInStock.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        prod = self.get_object(pk)
        serializer = QuantityInStockSerializer(prod)
        response = json.loads(requests.get(baseUrl+'product/'+str(pk)+'/').text)
        response['quantity'] = serializer.data['quantity']
        return Response(response)

#Incrémente la quantité du produit et met à jour le sale et le discount en fonction du produit
class IncrementStock(APIView):
    #calcul de la nouvelle quantité et update dans la table du produit
    def increment_quantity(self, id, number):
        prod = QuantityInStock.objects.get(tigId=id)
        old_quantity = prod.quantity
        new_quantity = old_quantity + number
        QuantityInStock.objects.filter(tigId=id).update(quantity = new_quantity)
    
    def get_object(self, id):
        try:
            return QuantityInStock.objects.get(tigId=id)
        except QuantityInStock.DoesNotExist:
            raise Http404

    def get(self,request,id,number,totalPrice,format=None):
        prod = self.get_object(id)
        if prod:
            response = requests.get(baseUrl+'product/'+str(id)+'/')
            json_response = response.json()
            self.increment_quantity(id,number)
            #récupère le produit de la table myRevendeurApp_quantityInStock avec la quantité à jour 
            new_prod = self.get_object(id)
            costIsAdd = AddCost.add(id,number,totalPrice)
            if costIsAdd:
                response = {}
                response['message']='Produit mis à jour'
                response['id']=id
                return Response(response,status=200)
            else:
                erreur = {}
                erreur['message'] = 'Veuillez vérifier les valeurs saisies'
                erreur['id'] = id
                return Response(response,status=404)
        else:
            return Response("Le produit n'existe pas",status=404)

##Incrémente la quantité du produit et met à jour le sale et le discount en fonction du produit
class DecrementStock(APIView):
    #récupération de la nouvelle quantité 
    def new_quantity(self, id, number):
        prod = QuantityInStock.objects.get(tigId=id)
        old_quantity = prod.quantity
        new_quantity = old_quantity - number
        return new_quantity

    def get_object(self, id):
        try:
            return QuantityInStock.objects.get(tigId=id)
        except QuantityInStock.DoesNotExist:
            return Response('id not found',status=404)
    
    def get(self,request,id,number,totalPrice,category,format=None):
        prod_in_quantity_in_stock = self.get_object(id)
        if prod_in_quantity_in_stock:
            new_quantity = self.new_quantity(id,number)
            if new_quantity >= 0:
                response = requests.get(baseUrl+'product/'+str(id)+'/')
                prod_in_database = response.json()
                QuantityInStock.objects.filter(tigId=id).update(quantity = new_quantity)
                #récupère le produit de la table myRevendeurApp_quantityInStock avec la quantité à jour pour
                gainIsAdd = AddGain.add(id,number,totalPrice,category)
                if gainIsAdd is True:
                    response = {}
                    response['message']='Produit mis à jour'
                    response['id']=id
                    return Response(response,status=200)
                else:
                    erreur = {}
                    erreur['message'] = 'Veuillez vérifier les valeurs saisies'
                    erreur['id'] = id
                    return Response(response,status=404) 
            else:
                response = {}
                response['message']='La saisie de votre quantité est incorrecte'
                response['quantityProduct']=new_quantity
                return Response(response,status=405)
        else:
            return Response("Le produit n'existe pas" ,status=404)

#Met à jour la quantité ou la promotion
class UpdateStock(APIView):
    def get_object_QuantityInStock(self, id):
        try:
            return QuantityInStock.objects.get(tigId=id)
        except QuantityInStock.DoesNotExist:
            return Response('Produit introuvable',status=404)

    def get_object_ProductSale(self,id):
        try:
            return ProductSale.objects.get(tigId=id)
        except ProductSale.DoesNotExist:
            return Response('Produit introuvable',status=404)

    def update_quantity_discount(prodBDDiscount,prodBDQuantity,stock,response):
        if stock['quantity'] >= 0:
            prodBDQuantity.update(quantity=stock['quantity'])
        else:
            return False, stock
        if 0 < stock['discount'] <= 90:
            new_price = round((response['price']*(stock['discount']/100)),2)
            prodBDDiscount.update(discount=new_price,sale=True)
        elif stock['discount'] == 0 or stock['discount'] == 0.0:
            prodBDDiscount.update(discount=0.0, sale=False)
        else:
            return False, stock


    @require_http_methods(["PUT"])
    def put(self, request, newStock):
        for stock in newStock:
            prodBDQuantity = self.get_object_QuantityInStock(stock.id)
            prodBDDiscount = self.get_object_ProductSale(stock.id)
            if prodBDDiscount and prodBDQuantity:
                response = (requests.get(baseUrl+'product/'+str(stock['id'])+'/')).json()
                isUpdate = self.update_quantity_discount(prodBDDiscount,prodBDQuantity,stock,response)
                if not isUpdate:
                    erreur={}
                    erreur['message'] = 'La promotion ou la quantité saisie est incorrecte, veuillez vérifier le produit'
                    erreur['value'] = isUpdate[1]
                    return Response(erreur,status=404)
        
        return Response('Les données ont été correctement mises à jour')



class UpdateQuantity(APIView):
    def get_object_QuantityInStock(self, id,new_quantity):
        try:
            return QuantityInStock.objects.get(tigId=id)
        except QuantityInStock.DoesNotExist:
            erreur={}
            erreur['message']='Veuillez vérifier la quantité du produit'
            erreur['id']=id
            erreur['quantity']=new_quantity
            return Response('Produit introuvable',status=404)

    def get(self,request,id,new_quantity,totalPrice):
        prodBDQuantity = self.get_object_QuantityInStock(id,new_quantity)
        old_quantity = prodBDQuantity.quantity
        if prodBDQuantity and new_quantity >= 0:
            prodBDQuantity.quantity = new_quantity
            prodBDQuantity.save()
            if new_quantity > old_quantity:
                AddCost.update(self,id,new_quantity,totalPrice)
            response = {}
            response['message']='Produit mis à jour'
            response['id']=id
            return Response(response,status=200)
        else:
            erreur={}
            erreur['message']='Veuillez vérifier la quantité du produit'
            erreur['id']=id
            erreur['quantity']=new_quantity
            return Response(erreur,status=404)

                



        



        
